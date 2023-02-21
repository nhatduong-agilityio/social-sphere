import { Box, Button, FormControl, InputBase, Typography, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { IUser } from '~/types/user';

interface IProps {
  rows: IUser[];
  onRows: (rows: IUser[]) => void;
}

export const FilterName = ({ rows, onRows }: IProps) => {
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState('');

  const requestSearch = useCallback(
    (searchedVal: string) => {
      const filteredRows = rows.filter((row) => {
        return row.name.toLowerCase().includes(searchedVal.toLowerCase());
      });

      onRows(filteredRows);
    },
    [onRows, rows],
  );

  useEffect(() => {
    setSearchValue(searchValue);
  }, [searchValue]);

  const handleSetValueSearch = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearchValue(event.target.value);
  };

  const handleSearch = useCallback(() => {
    requestSearch(searchValue);
    setSearchValue('');
  }, [requestSearch, searchValue]);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
        Name
      </Typography>
      <FormControl sx={{ minWidth: '200px', padding: '0 12px 0 10px' }} size='small'>
        <InputBase
          onChange={handleSetValueSearch}
          value={searchValue}
          sx={{
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: 16,
            width: 'auto',
            padding: '6px 12px 4px 12px',
            color: theme.palette.primary.light,
          }}
        />
      </FormControl>

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
