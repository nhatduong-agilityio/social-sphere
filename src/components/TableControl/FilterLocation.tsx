// Libs
import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { FunctionComponent, useState } from 'react';
import { locationArr } from '~/constants/location';

interface IProps {
  onFilteredLocation: (location: string) => void;
}

export const FilterLocation: FunctionComponent<IProps> = ({ onFilteredLocation }: IProps) => {
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
        color={theme.palette.primary.light}
      >
        Location
      </Typography>
      <FormControl sx={{ minWidth: '110px' }} size='small'>
        <Select
          value={location}
          onChange={handleChange}
          autoWidth
          sx={{ fontSize: '16px', color: theme.palette.primary.light }}
        >
          {locationArr.map((item) => (
            <MenuItem
              key={item}
              sx={{ fontSize: '16px', color: theme.palette.primary.light }}
              value={item}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
