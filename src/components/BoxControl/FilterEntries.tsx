import {
  Box,
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';

interface IProps {
  entries: string;
  onSelectEntries: (entries: string) => void;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
}

export const FilterEntries = ({ entries, onSelectEntries, onChangeRowsPerPage }: IProps) => {
  const theme = useTheme();

  // component handle select entries and change row per page.
  const handleChange = (event: SelectChangeEvent) => {
    onSelectEntries(event.target.value);
    onChangeRowsPerPage(parseInt(event.target.value, 10), 0);
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
