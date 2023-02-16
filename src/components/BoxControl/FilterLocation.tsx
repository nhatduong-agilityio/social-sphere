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

interface IProps {
  onFilteredLocation: (location: string) => void;
}

export const FilterLocation = ({ onFilteredLocation }: IProps) => {
  const theme = useTheme();
  const [location, setLocation] = useState('All');

  const handleChange = (event: SelectChangeEvent) => {
    setLocation(event.target.value);
    onFilteredLocation(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        sx={{ fontSize: '13px', paddingRight: '5px' }}
        color={`${theme.palette.primary.light}`}
      >
        Location
      </Typography>
      <FormControl sx={{ minWidth: '110px' }} size='small'>
        <Select
          value={location}
          onChange={handleChange}
          autoWidth
          sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
        >
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'All'}
          >
            All
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Berlin'}
          >
            Berlin
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'London'}
          >
            London
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Madrid'}
          >
            Madrid
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'New York'}
          >
            New York
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Paris'}
          >
            Paris
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
