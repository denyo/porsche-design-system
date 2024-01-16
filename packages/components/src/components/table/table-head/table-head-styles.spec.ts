import { getComponentCss } from './table-head-styles';
import { validateCssAndMatchSnapshot } from '../../../../tests/unit/helpers';

describe('getComponentCss()', () => {
  it('should return correct css', () => {
    validateCssAndMatchSnapshot(getComponentCss());
  });
});
