import { Box, Grid, Table, TableCell, TableHead, TableRow } from '@mui/material';
import { FilterEntries } from './FilterEntries';
import { FilterLocation } from './FilterLocation';
import { FilterName } from './FilterName';
import { FilterStatus } from './FilterStatus';

export const TableFilter = () => {
  return (
    <Box
      sx={{
        paddingBottom: '15px',
        borderBottom: '1px solid #e9e9e9',
      }}
    >
      <Grid container spacing={1} margin={0} width={'100%'}>
        <Grid xs={4}>
          <FilterEntries />
        </Grid>
        <Grid xs={2}>
          <FilterStatus />
        </Grid>
        <Grid xs={2}>
          <FilterLocation />
        </Grid>
        <Grid xs={4}>
          <FilterName />
        </Grid>
      </Grid>
    </Box>
  );
};
