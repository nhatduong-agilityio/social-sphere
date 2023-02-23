// Libs
import { TextField } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  name: string;
}

export const NameContent: FunctionComponent<IProps> = memo(({ name }: IProps) => {
  return (
    <TextField
      sx={{
        fontSize: '13px',
      }}
      margin='dense'
      name='inputName'
      label='Name customer'
      type='text'
      fullWidth
      variant='standard'
      defaultValue={name}
    />
  );
});

NameContent.displayName = 'NameContent';
