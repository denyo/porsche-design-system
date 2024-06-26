import { DummyRadioButton, DummyRadioButtonProps, dummyRadioButtonPropsKeys } from '../../dummy/DummyRadioButton';
import {
  PRadioButtonWrapperProps,
  RadioButtonWrapper,
} from '../../lib/components/RadioButtonWrapper/RadioButtonWrapper';
import { partitionProps } from '../../form-utils';

export type RadioButtonProps = PRadioButtonWrapperProps & DummyRadioButtonProps;

export const RadioButton = (props: RadioButtonProps): JSX.Element => {
  const [wrapperProps, dummyRadioButtonProps] = partitionProps<PRadioButtonWrapperProps, DummyRadioButtonProps>(
    props,
    dummyRadioButtonPropsKeys
  );

  return (
    <RadioButtonWrapper {...wrapperProps}>
      <DummyRadioButton {...dummyRadioButtonProps} />
    </RadioButtonWrapper>
  );
};
