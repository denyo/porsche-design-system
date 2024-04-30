import {
  borderRadiusSmall,
  dropShadowHighStyle,
  getMediaQueryMin,
  gridExtendedOffsetBase,
  gridExtendedOffsetS,
  gridExtendedOffsetXXL,
  motionDurationLong,
  motionDurationModerate,
  motionEasingOut,
} from '@porsche-design-system/utilities-v2';
import { getCss } from '../../utils';
import {
  addImportantToEachRule,
  colorSchemeStyles,
  cssVariableTransitionDuration,
  getTransition,
  hostHiddenStyles,
} from '../../styles';

const cssVariableTop = '--p-banner-position-top';
const cssVariableBottom = '--p-banner-position-bottom';

const topBottomFallback = '56px';

export const getComponentCss = (isOpen: boolean): string => {
  return getCss({
    '@global': {
      ':host': {
        display: 'block',
        ...addImportantToEachRule({
          position: 'fixed',
          border: '0',
          outline: '0',
          bottom: `var(${cssVariableBottom},${topBottomFallback})`,
          left: gridExtendedOffsetBase,
          right: gridExtendedOffsetBase,
          margin: 0,
          padding: 0,
          width: 'auto',
          maxWidth: '100%', // If component is wrapped in container with maxWidth
          ...dropShadowHighStyle,
          borderRadius: borderRadiusSmall, // needed for rounded box-shadow
          ...(isOpen
            ? {
                opacity: 1,
                visibility: 'inherit',
                pointerEvents: 'inherit',
                transform: 'translate3d(0,0,0)',
                transition: `${getTransition('transform', 'moderate', 'in')}, ${getTransition('opacity', 'moderate', 'in')}`,
              }
            : {
                opacity: 0,
                visibility: 'hidden',
                pointerEvents: 'none',
                transform: `translate3d(0,calc(var(${cssVariableBottom},${topBottomFallback}) + 100%),0)`,
                '&(.hydrated),&(.ssr)': {
                  transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}`,
                  // during transition the element will be removed from top-layer immediately, resulting in other elements laying over (as of Mai 2024 only Chrome is fixed by this)
                  '@supports (transition-behavior: allow-discrete)': {
                    transition: `visibility 0s linear var(${cssVariableTransitionDuration}, ${motionDurationLong}), ${getTransition('transform', 'moderate', 'out')}, ${getTransition('opacity', 'moderate', 'out')}, overlay var(${cssVariableTransitionDuration}, ${motionDurationModerate}) ${motionEasingOut} allow-discrete`,
                  },
                },
              }),
          [getMediaQueryMin('s')]: {
            top: `var(${cssVariableTop},${topBottomFallback})`,
            bottom: 'auto',
            left: gridExtendedOffsetS,
            right: gridExtendedOffsetS,
            // space before and after "-" is crucial)
            ...(!isOpen && { transform: `translate3d(0,calc(-100% - var(${cssVariableTop},${topBottomFallback})),0)` }),
          },
          [getMediaQueryMin('xxl')]: {
            left: gridExtendedOffsetXXL,
            right: gridExtendedOffsetXXL,
          },
          ...colorSchemeStyles,
          ...hostHiddenStyles,
        }),
      },
    },
  });
};
