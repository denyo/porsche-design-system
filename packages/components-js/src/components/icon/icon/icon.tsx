import { Build, Component, Element, h, Host, Prop, State, Watch } from '@stencil/core';
import { buildIconUrl, getSvgContent } from './icon-request';
import cx from 'classnames';
import { prefix } from '../../../utils';
import { Theme, IconName } from '../../../types';

// ToDo: icon directory is nested in another icon directory. Is this necessary?

const DEFAULT_ICON_NAME: IconName = 'arrow-head-right';

@Component({
  tag: 'p-icon',
  styleUrl: 'icon.scss',
  shadow: true
})
export class Icon {
  @Element() public el!: HTMLElement;

  /**
   * Specifies which icon to use.
   */
  @Prop() public name?: IconName = DEFAULT_ICON_NAME;

  /**
   * Specifies a whole icon path which can be used for custom icons.
   */
  @Prop() public source?: string;

  /**
   * @internal
   * Specifies which icon variant to use.
   */
  @Prop() public variant?: 'outline' | 'filled' = 'outline';

  /** Basic color variations depending on theme property. */
  @Prop() public color?: 'brand' | 'default' | 'neutral-contrast-high' | 'neutral-contrast-medium' | 'neutral-contrast-low' | 'notification-success' | 'notification-warning' | 'notification-error' | 'inherit' = 'default';

  /**
   * The size of the icon.
   */
  @Prop() public size?: 'small' | 'medium' | 'large' | 'inherit' = 'small';

  /**
   * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
   * Default, `false`.
   */
  @Prop() public lazy?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  private io?: IntersectionObserver;

  @State() private svgContent?: string;
  @State() private isVisible = false;

  public connectedCallback(): void {
    // purposely do not return the promise here because loading
    // the svg file should not hold up loading the app
    // only load the svg if it's visible
    this.waitUntilVisible(this.el, '50px', () => {
      this.isVisible = true;
      this.loadIcon();
    });
  }

  public disconnectedCallback(): void {
    if (this.io) {
      this.io.disconnect();
      this.io = undefined;
    }
  }

  public render(): JSX.Element {
    const iconClasses = cx(
      prefix('icon'),
      prefix(`icon--size-${this.size}`),
      prefix(`icon--color-${this.color}`),
      this.color !== 'inherit' && prefix(`icon--theme-${this.theme}`)
    );

    return (
      <Host role='img'>
        <i class={iconClasses} innerHTML={this.svgContent}/>
      </Host>
    );
  }

  // ToDo: watch is triggered 2x because of stencil life cycle. Remove double name watch.
  @Watch('name')
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  private resetNameProp(): void { // ignore unused local
    if (this.name === null) {
      this.name = DEFAULT_ICON_NAME;
    }
  }

  @Watch('source')
  @Watch('name')
  private loadIcon(): void {
    if (Build.isBrowser && this.isVisible) {
      this.svgContent = undefined; // reset svg content while new icon is loaded
      const url = buildIconUrl(this.source ?? this.name);
      getSvgContent(url).then((iconContent) => {
        if (url === buildIconUrl(this.source ?? this.name)) { // check if response matches current icon source
          this.svgContent = iconContent;
        }
      });
    }
  }

  private waitUntilVisible(el: HTMLElement, rootMargin: string, cb: () => void): void {
    if (Build.isBrowser && this.lazy && typeof window !== 'undefined' && (window as any).IntersectionObserver) {
      const io = this.io = new (window as any).IntersectionObserver((data: IntersectionObserverEntry[]) => {
        if (data[0].isIntersecting) {
          io.disconnect();
          this.io = undefined;
          cb();
        }
      }, {rootMargin});

      io.observe(el);

    } else {
      // browser doesn't support IntersectionObserver
      // so just fallback to always show it
      cb();
    }
  }
}
