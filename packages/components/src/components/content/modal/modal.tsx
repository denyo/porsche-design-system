import { Component, Element, Event, EventEmitter, Host, JSX, Prop, Watch, h } from '@stencil/core';
import type { BreakpointCustomizable, SelectedAriaAttributes } from '../../../types';
import {
  attachComponentCss,
  attachSlottedCss,
  getPrefixedTagNames,
  hasNamedSlot,
  parseAndGetAriaAttributes,
} from '../../../utils';
import type { ModalAriaAttributes } from './modal-utils';
import {
  getFirstAndLastFocusableElement,
  MODAL_ARIA_ATTRIBUTES,
  setScrollLock,
  warnIfAriaAndHeadingPropsAreUndefined,
} from './modal-utils';
import { getComponentCss, getSlottedCss } from './modal-styles';

@Component({
  tag: 'p-modal',
  shadow: true,
})
export class Modal {
  @Element() public host!: HTMLElement;

  /** If true, the modal is open. */
  @Prop() public open = false;

  /** If true, the modal will not have a close button. */
  @Prop() public disableCloseButton?: boolean = false;

  /** If true, the modal will not be closable via backdrop click. */
  @Prop() public disableBackdropClick?: boolean = false;

  /** The title of the modal */
  @Prop() public heading?: string;

  /** If true the modal uses max viewport height and width. Should only be used for mobile. */
  @Prop() public fullscreen?: BreakpointCustomizable<boolean> = false;

  /** Add ARIA attributes. */
  @Prop() public aria?: SelectedAriaAttributes<ModalAriaAttributes>;

  /** Emitted when the component requests to be closed. */
  @Event({ bubbles: false }) public close?: EventEmitter<void>;

  private focusedElBeforeOpen: HTMLElement;
  private focusableElements: [HTMLElement, HTMLElement] | [] = [];
  private closeBtn: HTMLElement;
  private hasHeader: boolean;

  @Watch('open')
  public openChangeHandler(isOpen: boolean): void {
    setScrollLock(this.host, isOpen, this.onKeyboardEvent);

    if (isOpen) {
      this.focusableElements = getFirstAndLastFocusableElement(this.host, this.closeBtn);
      this.focusedElBeforeOpen = document.activeElement as HTMLElement;
    } else {
      this.focusedElBeforeOpen?.focus();
    }
  }

  public connectedCallback(): void {
    attachSlottedCss(this.host, getSlottedCss);
    if (this.open) {
      // in case modal is rendered with open prop
      setScrollLock(this.host, true, this.onKeyboardEvent);
    }
  }

  public componentDidLoad(): void {
    // in case modal is rendered with open prop
    this.focusableElements = getFirstAndLastFocusableElement(this.host, this.closeBtn);
    // TODO: watch for slot changes
  }

  public componentWillRender(): void {
    warnIfAriaAndHeadingPropsAreUndefined(this.host, this.heading, this.aria);
    this.hasHeader = !!this.heading || hasNamedSlot(this.host, 'heading');
    attachComponentCss(this.host, getComponentCss, this.open, this.fullscreen, this.disableCloseButton, this.hasHeader);
  }

  public componentDidUpdate(): void {
    if (this.open) {
      /* the close button is not immediately visible when the @Watch('open') triggers,
       so we focus it in componentDidUpdate() */
      this.focusableElements[0]?.focus();
    }
  }

  public disconnectedCallback(): void {
    setScrollLock(this.host, false, this.onKeyboardEvent);
  }

  public render(): JSX.Element {
    const PrefixedTagNames = getPrefixedTagNames(this.host);

    return (
      <Host onMouseDown={!this.disableBackdropClick && this.onMouseDown}>
        <div
          class="root"
          role="dialog"
          aria-modal="true"
          {...{ ['aria-label']: this.heading, ...parseAndGetAriaAttributes(this.aria, MODAL_ARIA_ATTRIBUTES) }}
          aria-hidden={!this.open ? 'true' : 'false'}
        >
          {!this.disableCloseButton && (
            <PrefixedTagNames.pButtonPure
              class="close"
              type="button"
              ref={(el) => (this.closeBtn = el)}
              hideLabel
              icon="close"
              onClick={this.closeModal}
            >
              Close modal
            </PrefixedTagNames.pButtonPure>
          )}
          {this.hasHeader && (
            <div class="header">
              {this.heading && (
                <PrefixedTagNames.pHeadline variant={{ base: 'medium', m: 'large' }}>
                  {this.heading}
                </PrefixedTagNames.pHeadline>
              )}
              {!this.heading && this.hasHeader && <slot name="heading" />}
            </div>
          )}
          <slot />
        </div>
      </Host>
    );
  }

  private onKeyboardEvent = (e: KeyboardEvent): void => {
    const { key, shiftKey } = e;
    if (!this.disableCloseButton && (key === 'Esc' || key === 'Escape')) {
      this.closeModal();
    } else if (key === 'Tab') {
      // TODO: try blur eventListener?
      // cycle focus within modal elements
      const [firstEl, lastEl] = this.focusableElements;
      if (this.focusableElements.length <= 1) {
        e.preventDefault();
        firstEl?.focus();
      } else {
        const { activeElement: activeElLight } = document;
        const { activeElement: activeElShadow } = this.host.shadowRoot;

        if (shiftKey) {
          if (activeElLight === firstEl || activeElShadow === firstEl) {
            e.preventDefault();
            lastEl.focus();
          }
        } else {
          if (activeElLight === lastEl || activeElShadow === lastEl) {
            e.preventDefault();
            firstEl.focus();
          }
        }
      }
    }
  };

  private closeModal = (): void => {
    this.close.emit();
  };

  private onMouseDown = (e: MouseEvent): void => {
    const [firstEl] = e.composedPath() as HTMLElement[];
    if (firstEl === this.host) {
      this.closeModal();
    }
  };
}
