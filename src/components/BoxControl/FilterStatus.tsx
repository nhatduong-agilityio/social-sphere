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
import { STATUS } from '~/constant/status';

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
      <FilterAltSharpIcon sx={{ fontSize: '18px', color: `${theme.palette.primary.light}` }} />
      <Typography
        sx={{ fontSize: '13px', padding: '0 10px 0 30px' }}
        color={`${theme.palette.primary.light}`}
      >
        Status
      </Typography>
      <FormControl sx={{ minWidth: '110px' }} size='small'>
        <Select
          value={status}
          onChange={handleChange}
          autoWidth
          sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
        >
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Any'}
          >
            Any
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Delivered'}
          >
            Delivered
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Shipped'}
          >
            Shipped
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Cancelled'}
          >
            Cancelled
          </MenuItem>
          <MenuItem
            sx={{ fontSize: '16px', color: `${theme.palette.primary.light}` }}
            value={'Pending'}
          >
            Pending
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};
