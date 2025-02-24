import { validateCssAndMatchSnapshot } from '../../../tests/unit/helpers';
import { getComponentCss } from './input-password-styles';

describe('getComponentCss()', () => {
  it.each<Parameters<typeof getComponentCss>>([
    [false, false, 'none', true, 'light'],
    [false, false, 'none', true, 'light'],
    [false, false, 'none', false, 'light'],
    [false, true, 'none', true, 'light'],
    [false, true, 'none', false, 'light'],
    [false, false, 'success', true, 'light'],
    [false, false, 'success', false, 'light'],
    [false, true, 'success', true, 'light'],
    [false, true, 'success', false, 'light'],
    [false, false, 'error', true, 'light'],
    [false, false, 'error', false, 'light'],
    [false, true, 'error', true, 'light'],
    [false, true, 'error', false, 'light'],
    [true, true, 'error', false, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'light'],
    [false, { base: true, xs: false, s: true, m: false, l: true, xl: false }, 'none', true, 'dark'],
  ])(
    'should return correct css for isDisabled: %s, hideLabel: %o, state: %s, showPasswordToggle: %s, theme: %s',
    (...args) => {
      validateCssAndMatchSnapshot(getComponentCss(...args));
    }
  );
});
