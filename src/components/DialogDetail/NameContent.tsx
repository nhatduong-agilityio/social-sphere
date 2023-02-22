import { TextField } from '@mui/material';
import { ChangeEvent, FunctionComponent, memo, useEffect, useState } from 'react';

interface IProps {
  name: string;
  onSetName: (name: string) => void;
}

export const NameContent: FunctionComponent<IProps> = memo(({ name, onSetName }: IProps) => {
  const [valueName, setValueName] = useState(name);

  const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueName(event.target.value);
  };

  useEffect(() => {
    onSetName(valueName);
  }, [onSetName, valueName]);

  return (
    <TextField
      sx={{
        fontSize: '13px',
      }}
      margin='dense'
      id='name'
      label='Name customer'
      type='text'
      fullWidth
      variant='standard'
      onChange={handleChangeName}
      value={name || ''}
    />
  );
});

NameContent.displayName = 'NameContent';
