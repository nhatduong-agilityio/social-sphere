import { TextField } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  date: string;
}

export const DateContent: FunctionComponent<IProps> = memo(({ date }: IProps) => {
  return (
    <TextField
      name='orderDate'
      label='Order Date'
      fullWidth
      variant='standard'
      InputLabelProps={{ shrink: true }}
      defaultValue={date}
      type='date'
    />
  );
});

DateContent.displayName = 'DateContent';
