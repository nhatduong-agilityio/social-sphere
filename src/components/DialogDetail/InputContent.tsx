// Libs
import { TextField } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  nameInput: string;
  valueInput: string | number;
  type?: string;
  shrink?: boolean;
}

export const InputContent: FunctionComponent<IProps> = memo(
  ({ nameInput, valueInput, type, shrink }: IProps) => {
    return (
      <TextField
        sx={{
          fontSize: '13px',
        }}
        margin='dense'
        name={nameInput}
        label='Name customer'
        type={type ? type : 'text'}
        fullWidth
        variant='standard'
        defaultValue={valueInput}
        InputLabelProps={shrink ? { shrink } : undefined}
      />
    );
  },
);

InputContent.displayName = 'InputContent';
