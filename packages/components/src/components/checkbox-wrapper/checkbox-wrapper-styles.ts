import {
  borderRadiusSmall,
  fontFamily,
  fontLineHeight,
  fontSizeTextSmall,
  spacingStaticSmall,
  spacingStaticXSmall,
} from '@porsche-design-system/styles';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  getInvertedThemedColors,
  getSchemedHighContrastMediaQuery,
  getThemedColors,
  hostHiddenStyles,
  prefersColorSchemeDarkMediaQuery,
  preventFoucOfNestedElementsStyles,
} from '../../styles';
import { getSlottedCheckboxRadioButtonStyles } from '../../styles/checkbox-radio-styles';
import type { BreakpointCustomizable, Theme } from '../../types';
import { getCss, isDisabledOrLoading, isHighContrastMode, mergeDeep } from '../../utils';
import type { FormState } from '../../utils/form/form-state';
import { escapeHashCharacter } from '../../utils/svg/escapeHashCharacter';
import { getInlineSVGBackgroundImage } from '../../utils/svg/getInlineSVGBackgroundImage';
import { getFunctionalComponentLabelStyles } from '../common/label/label-styles';
import { getFunctionalComponentLoadingMessageStyles } from '../common/loading-message/loading-message-styles';
import { getFunctionalComponentStateMessageStyles } from '../common/state-message/state-message-styles';

const getCheckedSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(
    `<path fill="${fill}" d="m20.22,7.47l-1.47-1.42-9.26,9.02-4.24-4.15-1.47,1.42,5.71,5.6,10.73-10.47Z"/>`
  );
};

const getIndeterminateSVGBackgroundImage = (fill: string): string => {
  return getInlineSVGBackgroundImage(`<path fill="${fill}" d="m20,11v2H4v-2h16Z"/>`);
};

export const getComponentCss = (
  hideLabel: BreakpointCustomizable<boolean>,
  state: FormState,
  isDisabled: boolean,
  isLoading: boolean,
  theme: Theme
): string => {
  const checkedIconColor = escapeHashCharacter(getInvertedThemedColors(theme).primaryColor);
  const checkedIconColorDark = escapeHashCharacter(getInvertedThemedColors('dark').primaryColor);
  const indeterminateIconColor = escapeHashCharacter(getThemedColors(theme).primaryColor);
  const indeterminateIconColorDark = escapeHashCharacter(getThemedColors('dark').primaryColor);

  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
      ...preventFoucOfNestedElementsStyles,
      // ::slotted(input)
      ...addImportantToEachRule(
        mergeDeep(getSlottedCheckboxRadioButtonStyles(state, isDisabled, isLoading, theme), {
          '::slotted': {
            '&(input)': {
              gridArea: '1/1',
              borderRadius: borderRadiusSmall,
            },
            // TODO: is it somehow useful possible to make following styles configurable by parameter?
            ...(!isLoading && {
              '&(input:checked)': {
                backgroundImage: getCheckedSVGBackgroundImage(checkedIconColor),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  backgroundImage: getCheckedSVGBackgroundImage(checkedIconColorDark),
                }),
                // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                ...(isHighContrastMode &&
                  getSchemedHighContrastMediaQuery(
                    {
                      backgroundImage: getCheckedSVGBackgroundImage('white'),
                    },
                    {
                      backgroundImage: getCheckedSVGBackgroundImage('black'),
                    }
                  )),
              },
              '&(input:indeterminate)': {
                backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColor),
                ...prefersColorSchemeDarkMediaQuery(theme, {
                  backgroundImage: getIndeterminateSVGBackgroundImage(indeterminateIconColorDark),
                }),
                // This is a workaround for Blink based browsers, which do not reflect the high contrast system colors (e.g.: "Canvas" and "CanvasText") when added to background SVG's.
                ...(isHighContrastMode &&
                  getSchemedHighContrastMediaQuery(
                    {
                      backgroundImage: getIndeterminateSVGBackgroundImage('black'),
                    },
                    {
                      backgroundImage: getIndeterminateSVGBackgroundImage('white'),
                    }
                  )),
              },
            }),
          },
        })
      ),
    },
    root: {
      display: 'grid',
      gridTemplateColumns: 'auto minmax(0, 1fr)',
      rowGap: spacingStaticXSmall,
    },
    wrapper: {
      display: 'grid',
      gridArea: '1/1',
      alignSelf: 'flex-start', // in case label becomes multiline
      ...(isDisabledOrLoading(isDisabled, isLoading) && {
        // TODO: maybe .wrapper should handle it for all form components while pointer-events: none is set to input
        cursor: 'not-allowed',
      }),
    },
    ...(isLoading && {
      // TODO: extract for checkbox-wrapper and radio-button-wrapper (not gridArea and placeSelf)
      spinner: {
        position: 'relative', // ensure correct stacking, can be removed as soon as focus for input is handled with outline
        gridArea: '1/1',
        placeSelf: 'center',
        width: fontLineHeight,
        height: fontLineHeight,
        font: `${fontSizeTextSmall} ${fontFamily}`, // needed for correct width and height definition based on ex-unit
        pointerEvents: 'none',
      },
    }),
    // .label / .required
    ...getFunctionalComponentLabelStyles(
      isDisabled || isLoading,
      hideLabel,
      theme,
      {
        gridArea: '1/2',
      },
      {
        paddingTop: '2px', // compensate vertical alignment
        paddingInlineStart: spacingStaticSmall, // asymmetric padding used instead of gap to prevent not clickable area between label and input
      }
    ),
    // .message
    ...getFunctionalComponentStateMessageStyles(theme, state, {
      gridColumn: '1/3',
    }),
    // .loading
    ...getFunctionalComponentLoadingMessageStyles(),
  });
};
