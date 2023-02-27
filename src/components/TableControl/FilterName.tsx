// Libs
import { Box, Button, Typography, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { FormEvent, useContext } from 'react';

// Types
import { IUser } from '~/types/user';

// Store
import { IUserContext, UserContext } from '~/store/providers/user';

// Components
import { FormInput } from '@components/TableControl/FormInput';

interface IProps {
  onRows: (rows: IUser[]) => void;
}

const useUsers = () => useContext<IUserContext>(UserContext);

const requestSearch = (rows: IUser[], searchedVal: string, onRows: (rows: IUser[]) => void) => {
  const filteredRows = rows.filter((row) => {
    return row.name.toLowerCase().includes(searchedVal.toLowerCase());
  });

  onRows(filteredRows);
};

export const FilterName = ({ onRows }: IProps) => {
  const theme = useTheme();
  const { users } = useUsers();

  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const valueFrom = Object.fromEntries(formData.entries());

    const formInput = valueFrom.formInput.toString();

    if (users.data) {
      requestSearch(users.data, formInput, onRows);
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
        Name
      </Typography>
      <form onSubmit={handleSearch}>
        <FormInput />

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
