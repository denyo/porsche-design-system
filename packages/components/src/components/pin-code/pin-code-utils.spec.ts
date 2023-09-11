import * as pinCodeUtils from './pin-code-utils';
import * as setAttributesUtils from '../../utils/dom/setAttributes';
import * as consoleWarnUtils from '../../utils/log/logger';
import {
  getStylesWithoutSlottedSelector,
  initHiddenInput,
  inputConsistsOfDigits,
  inputIsSingleDigit,
  getArrayOfInputValues,
  syncHiddenInput,
  warnAboutTransformedInitialValue,
  getOptimizedValue,
} from './pin-code-utils';
import { PinCode } from './pin-code';

describe('getStylesWithoutSlottedSelector()', () => {
  it('should replace "::slotted()" from Styles objects selectors', () => {
    const stylesWithSlottedSelector = {
      '::slotted(input)': {
        display: 'none',
      },
      '@media(hover:hover)': {
        '::slotted(input:not(:disabled):not(:focus):not([readonly]):hover)': {
          border: '2px',
        },
      },
    };

    const stylesWithoutSlottedSelector = {
      input: {
        display: 'none',
      },
      '@media(hover:hover)': {
        'input:not(:disabled):not(:focus):not([readonly]):hover': {
          border: '2px',
        },
      },
    };

    expect(getStylesWithoutSlottedSelector(stylesWithSlottedSelector)).toStrictEqual(stylesWithoutSlottedSelector);
  });
});

describe('warnAboutTransformedInitialValue()', () => {
  it('should call consoleWarn() with correct parameters', () => {
    const warningPrefix = '@Prop() "value" on component <p-pin-code>:';
    const spy = jest.spyOn(consoleWarnUtils, 'consoleWarn');
    jest.spyOn(global.console, 'warn').mockImplementation();

    warnAboutTransformedInitialValue(4);

    expect(spy).toBeCalledWith(
      warningPrefix,
      'Provided pin code has too many characters and was truncated to the max length of 4.'
    );

    warnAboutTransformedInitialValue();

    expect(spy).toBeCalledWith(
      warningPrefix,
      'Provided pin code contains characters that are not of type number and the value has been reset.'
    );
  });
});

describe('inputIsSingleDigit()', () => {
  it('should return false if the provided string is not a single digit', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputIsSingleDigit');

    inputIsSingleDigit('12');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('abc');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('a');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('/^');
    expect(spy).toReturnWith(false);

    inputIsSingleDigit('^');
    expect(spy).toReturnWith(false);
  });

  it('should return true if the provided string is a single digit', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputIsSingleDigit');

    inputIsSingleDigit('1');
    expect(spy).toReturnWith(true);
  });
});

describe('inputConsistsOfDigits()', () => {
  it('should return false if the provided string does not consist digits', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputConsistsOfDigits');

    inputConsistsOfDigits('1a');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('a1');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1a2');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1^');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('^2');
    expect(spy).toReturnWith(false);

    inputConsistsOfDigits('1^2');
    expect(spy).toReturnWith(false);
  });

  it('should return true if the provided string does consist digits', () => {
    const spy = jest.spyOn(pinCodeUtils, 'inputConsistsOfDigits');

    inputConsistsOfDigits('1234');
    expect(spy).toReturnWith(true);
  });
});

describe('getArrayOfInputValues()', () => {
  it('should return array of values of an array of input elements', () => {
    const arrayOfInputs = Array.from({ length: 4 }, (_, i) => {
      const input = document.createElement('input');
      input.setAttribute('value', `${i}`);
      return input;
    });

    const joinedValue = getArrayOfInputValues(arrayOfInputs);

    expect(joinedValue).toStrictEqual(['0', '1', '2', '3']);
  });
});

describe('getOptimizedValue()', () => {
  it('should return pin code value if already optimal', () => {
    const pinCode = '1234';

    const optimizedValue = getOptimizedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });

  it('should remove whitespaces from pin code value', () => {
    const pinCode = ' 1 2 3 4 ';

    const optimizedValue = getOptimizedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });

  it('should shorten pin code value if value is too long', () => {
    const pinCode = ' 12345678';

    const optimizedValue = getOptimizedValue(pinCode, 4);

    expect(optimizedValue).toBe('1234');
  });
});

describe('initHiddenInput()', () => {
  it('should call syncHiddenInput() with correct parameters', () => {
    const spy = jest.spyOn(pinCodeUtils, 'syncHiddenInput');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledWith(hiddenInput, 'name', '1234', false, false);
  });

  it('should call setAttributes() with correct parameters', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(spy).toBeCalledTimes(2); // it is also called in syncHiddenInput()
    expect(spy).toBeCalledWith(hiddenInput, { 'aria-hidden': 'true', slot: 'hidden-input', tabindex: '-1' });
    expect(spy).toBeCalledWith(hiddenInput, { name: 'name', value: '1234' });
  });

  it('should return hidden input element with added attributes and prepend hidden input element to host', () => {
    const component = new PinCode();
    component.host = document.createElement('p-pin-code');

    const hiddenInput = initHiddenInput(component.host, 'name', '1234', false, false);

    expect(component.host.firstChild).toBe(hiddenInput);
  });
});

describe('syncHiddenInput()', () => {
  it('should call setAttributes() with correct parameters', () => {
    const spy = jest.spyOn(setAttributesUtils, 'setAttributes');
    const hiddenInput = document.createElement('input');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(spy).toBeCalledTimes(1);
    expect(spy).toBeCalledWith(hiddenInput, { name: 'updatedName', value: '4321' });
  });

  it('should call toggleAttribute() with correct parameters and update "required" and "disabled" attributes', () => {
    const hiddenInput = document.createElement('input');
    const spy = jest.spyOn(hiddenInput, 'toggleAttribute');

    syncHiddenInput(hiddenInput, 'updatedName', '4321', true, true);

    expect(spy).toBeCalledTimes(2);
    expect(spy).toBeCalledWith('disabled', true);
    expect(spy).toBeCalledWith('required', true);

    expect(hiddenInput.disabled).toBeTruthy();
    expect(hiddenInput.required).toBeTruthy();

    syncHiddenInput(hiddenInput, 'updatedName', '4321', false, false);

    expect(hiddenInput.disabled).toBeFalsy();
    expect(hiddenInput.required).toBeFalsy();
  });
});
