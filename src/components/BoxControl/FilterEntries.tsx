import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';

export const FilterEntries = () => {
  const theme = useTheme();
  const [entries, setEntries] = useState('5');

  const handleChange = (event: SelectChangeEvent) => {
    setEntries(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
      <Typography sx={{ fontSize: '13px' }} color={`${theme.palette.primary.light}`}>
        Show
      </Typography>
      <FormControl sx={{ minWidth: '60px', padding: '0 6px' }} size='small'>
        <Select
          className='select-small'
          value={entries}
          onChange={handleChange}
          autoWidth
          sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
        >
          <MenuItem sx={{ fontSize: '16px', color: `${theme.palette.primary.dark}` }} value={5}>
            5
          </MenuItem>
          <MenuItem sx={{ fontSize: '16px', color: `${theme.palette.primary.dark}` }} value={10}>
            10
          </MenuItem>
          <MenuItem sx={{ fontSize: '16px', color: `${theme.palette.primary.dark}` }} value={15}>
            15
          </MenuItem>
          <MenuItem sx={{ fontSize: '16px', color: `${theme.palette.primary.dark}` }} value={20}>
            20
          </MenuItem>
        </Select>
      </FormControl>
      <Typography sx={{ fontSize: '13px' }} color={`${theme.palette.primary.light}`}>
        entries
      </Typography>
    </Box>
  );
};
