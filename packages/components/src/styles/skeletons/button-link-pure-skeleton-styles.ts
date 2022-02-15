import { pxToRemWithUnit } from '../common-styles';
import {
  BUTTON_LINK_SKELETON_WIDTH,
  ELEMENT_SKELETON_HEIGHT,
  getBaseSkeletonStyles,
  getSkeletonElementHeight,
} from './skeleton-base-styles';
import { getMinifiedCss } from '@porsche-design-system/shared-src/src/styles/getMinifiedCss';

export const getButtonLinkPureSkeletonCss = (): string => {
  return getMinifiedCss({
    '@global': {
      'p-button-pure, p-link-pure': {
        '&:not(.hydrated)': {
          display: 'flex',
          minWidth: pxToRemWithUnit(BUTTON_LINK_SKELETON_WIDTH),
          minHeight: getSkeletonElementHeight(ELEMENT_SKELETON_HEIGHT / 2, false),
          ...getBaseSkeletonStyles(false),
        },
      },
    },
  });
};
