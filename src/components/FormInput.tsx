// Libs
import { FormControl, InputBase, SxProps, Theme } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  inputName: string;
  formStyle?: SxProps<Theme>;
  inputStyle?: SxProps<Theme>;
  selectSize?: 'medium' | 'small';
  disableValue?: boolean;
}

export const FormInput: FunctionComponent<IProps> = memo(
  ({ inputName, formStyle, inputStyle, disableValue, selectSize }: IProps) => {
    return (
      <FormControl
        sx={formStyle}
        size={selectSize ? selectSize : 'small'}
        disabled={disableValue ? disableValue : false}
      >
        <InputBase name={inputName} sx={inputStyle} />
      </FormControl>
    );
  },
);

FormInput.displayName = 'FormInput';
