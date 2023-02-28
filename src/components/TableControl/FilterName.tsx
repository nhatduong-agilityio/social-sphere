// Libs
import { Box, Button, Typography, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormEvent } from 'react';

// Components
import { FormInput } from '~/components/FormInput';

interface IProps {
  onFilteredName: (name: string) => void;
}

export const FilterName = ({ onFilteredName }: IProps) => {
  const theme = useTheme();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const valueFrom = Object.fromEntries(formData.entries());

    const formInput = valueFrom.formInput.toString();

    onFilteredName(formInput);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
        Name
      </Typography>
      <form onSubmit={handleSearch}>
        <FormInput
          inputName='formInput'
          formStyle={{ minWidth: '200px', padding: '0 12px 0 10px' }}
          inputStyle={{
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: 16,
            width: 'auto',
            padding: '6px 12px 4px 12px',
          }}
        />

        <Button
          color='secondary'
          variant='contained'
          type='submit'
          sx={{
            minWidth: '34px',
            padding: '12px',
            backgroundColor: '#03A9F4',
            ':hover': theme.palette.action.hover,
          }}
        >
          <SearchOutlinedIcon sx={{ fontSize: '16px' }} />
        </Button>
      </form>
    </Box>
  );
};
