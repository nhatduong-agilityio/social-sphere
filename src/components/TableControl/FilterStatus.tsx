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
import { useState } from 'react';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';

// Constants
import { STATUS, statusArr } from '~/constants/status';

interface IProps {
  onFilteredStatus: (status: string) => void;
}

export const FilterStatus = ({ onFilteredStatus }: IProps) => {
  const theme = useTheme();
  const [status, setStatus] = useState(STATUS.ANY);

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value);
    onFilteredStatus(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <FilterAltSharpIcon sx={{ fontSize: '18px', color: theme.palette.primary.light }} />
      <Typography
        sx={{ fontSize: '13px', padding: '0 10px 0 30px' }}
        color={theme.palette.primary.light}
      >
        Status
      </Typography>
      <FormControl sx={{ minWidth: '110px' }} size='small'>
        <Select
          value={status}
          onChange={handleChange}
          autoWidth
          sx={{ fontSize: '16px', color: theme.palette.primary.light }}
        >
          {statusArr.map((item) => (
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
