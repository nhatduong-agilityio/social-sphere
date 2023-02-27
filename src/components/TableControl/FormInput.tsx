// Libs
import { FormControl, InputBase } from '@mui/material';

export const FormInput = () => {
  return (
    <FormControl sx={{ minWidth: '200px', padding: '0 12px 0 10px' }} size='small'>
      <InputBase
        name='formInput'
        sx={{
          borderRadius: '4px',
          border: '1px solid #ddd',
          fontSize: 16,
          width: 'auto',
          padding: '6px 12px 4px 12px',
        }}
      />
    </FormControl>
  );
};

FormInput.displayName = 'FormInput';
