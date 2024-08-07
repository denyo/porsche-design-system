import type { BreakpointCustomizable, HeadingSize, HeadingTag, PropTypes, Theme } from '../../types';
import {
  type HeadingAlign,
  type HeadingAlignDeprecated,
  type HeadingColor,
  getHeadingTagType,
  HEADING_COLORS,
} from './heading-utils';
import { Component, Element, h, type JSX, Prop } from '@stencil/core';
import {
  AllowedTypes,
  applyConstructableStylesheetStyles,
  attachComponentCss,
  hasPropValueChanged,
  HEADING_SIZES,
  HEADING_TAGS,
  THEMES,
  TYPOGRAPHY_ALIGNS,
  validateProps,
  warnIfDeprecatedPropValueIsUsed,
} from '../../utils';
import { getComponentCss } from './heading-styles';
import { getSlottedAnchorStyles } from '../../styles';

type AlignDeprecationMapType = Record<HeadingAlignDeprecated, Exclude<HeadingAlign, HeadingAlignDeprecated>>;

const propTypes: PropTypes<typeof Heading> = {
  tag: AllowedTypes.oneOf<HeadingTag>([undefined, ...HEADING_TAGS]),
  size: AllowedTypes.breakpoint<HeadingSize>(HEADING_SIZES),
  align: AllowedTypes.oneOf<HeadingAlign>(TYPOGRAPHY_ALIGNS),
  color: AllowedTypes.oneOf<HeadingColor>(HEADING_COLORS),
  ellipsis: AllowedTypes.boolean,
  theme: AllowedTypes.oneOf<Theme>(THEMES),
};

/**
 * @slot {"name": "", "description": "Default slot to render the heading." }
 */
@Component({
  tag: 'p-heading',
  shadow: true,
})
export class Heading {
  @Element() public host!: HTMLElement;

  /** Sets a heading tag, so it fits correctly within the outline of the page. */
  @Prop() public tag?: HeadingTag;

  /** Size of the component. Also defines the size for specific breakpoints, like {base: "small", l: "medium"}. You always need to provide a base value when doing this. */
  @Prop() public size?: BreakpointCustomizable<HeadingSize> = 'xx-large';

  /** Text alignment of the component. */
  @Prop() public align?: HeadingAlign = 'start';

  /** Basic text color variations depending on theme property. */
  @Prop() public color?: HeadingColor = 'primary';

  /** Adds an ellipsis to a single line of text if it overflows. */
  @Prop() public ellipsis?: boolean = false;

  /** Adapts the text color depending on the theme. Has no effect when "inherit" is set as color prop. */
  @Prop() public theme?: Theme = 'light';

  public connectedCallback(): void {
    applyConstructableStylesheetStyles(this.host, getSlottedAnchorStyles);
  }

  public componentShouldUpdate(newVal: unknown, oldVal: unknown): boolean {
    return hasPropValueChanged(newVal, oldVal);
  }

  public render(): JSX.Element {
    validateProps(this, propTypes);

    const alignDeprecationMap: AlignDeprecationMapType = {
      left: 'start',
      right: 'end',
    };
    warnIfDeprecatedPropValueIsUsed<typeof Heading, HeadingAlignDeprecated, HeadingAlign>(
      this,
      'align',
      alignDeprecationMap
    );

    attachComponentCss(
      this.host,
      getComponentCss,
      this.size,
      (alignDeprecationMap[this.align as keyof AlignDeprecationMapType] || this.align) as Exclude<
        HeadingAlign,
        HeadingAlignDeprecated
      >,
      this.color,
      this.ellipsis,
      this.theme
    );

    const TagType = getHeadingTagType(this.host, this.size, this.tag);

    return (
      <TagType class="root">
        <slot />
      </TagType>
    );
  }
}
