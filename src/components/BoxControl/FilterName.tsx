import { Box, Button, Typography, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { useContext, useState } from 'react';
import { IUser } from '~/types/user';
import { IUserContext, UserContext } from '~/store/providers/user';
import { FormSearchContent } from './FormSearchContent';

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
  const [searchValue, setSearchValue] = useState('');

  const handleSearch = () => {
    if (users.data) {
      requestSearch(users.data, searchValue, onRows);
    }
    setSearchValue('');
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
        Name
      </Typography>

      <FormSearchContent searchValue={searchValue} onSetSearchValue={setSearchValue} />

      <Button
        color='secondary'
        variant='contained'
        onClick={handleSearch}
        sx={{
          minWidth: '34px',
          padding: '12px',
          backgroundColor: '#03A9F4',
          ':hover': theme.palette.action.hover,
        }}
      >
        <SearchOutlinedIcon sx={{ fontSize: '16px' }} />
      </Button>
    </Box>
  );
};
