import { Box, Button, FormControl, InputBase, Typography, useTheme } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const FilterName = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <Typography sx={{ fontSize: '13px' }} color={`${theme.palette.primary.light}`}>
        Name
      </Typography>
      <FormControl sx={{ minWidth: '200px', padding: '0 12px 0 10px' }} size='small'>
        <InputBase
          sx={{
            borderRadius: '4px',
            border: '1px solid #ddd',
            fontSize: 16,
            width: 'auto',
            padding: '6px 12px 4px 12px',
            color: `${theme.palette.primary.light}`,
          }}
        />
      </FormControl>

      <Button
        color='secondary'
        variant='contained'
        sx={{
          minWidth: '34px',
          padding: '12px',
          backgroundColor: '#03A9F4',
          ':hover': `${theme.palette.action.hover}`,
        }}
      >
        <SearchOutlinedIcon sx={{ fontSize: '16px' }} />
      </Button>
    </Box>
  );
};
