// Libs
import { TextField } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  netAmount: number;
}

export const NetAmountContent: FunctionComponent<IProps> = memo(({ netAmount }: IProps) => {
  return (
    <TextField
      margin='dense'
      name='netAmount'
      label='Net Amount'
      type='text'
      fullWidth
      variant='standard'
      defaultValue={netAmount}
    />
  );
});

NetAmountContent.displayName = 'NetAmountContent';
