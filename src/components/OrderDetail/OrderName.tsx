// Libs
import { TextField } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  nameInput: string;
  valueInput: string | number;
  type?: string;
  shrink?: boolean;
}

export const OrderName: FunctionComponent<IProps> = memo(
  ({ nameInput, valueInput, type, shrink }: IProps) => {
    const label = nameInput.toUpperCase();

    return (
      <TextField
        inputProps={{ style: { fontSize: '13px' } }}
        margin='dense'
        name={nameInput}
        label={label}
        type={type ? type : 'text'}
        fullWidth
        variant='standard'
        defaultValue={valueInput}
        InputLabelProps={shrink ? { shrink } : undefined}
      />
    );
  },
);

OrderName.displayName = 'OrderName';
