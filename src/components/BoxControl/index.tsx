import { Box, Grid } from '@mui/material';
import { FilterEntries } from './FilterEntries';
import { FilterLocation } from './FilterLocation';
import { FilterName } from './FilterName';
import { FilterStatus } from './FilterStatus';

interface IProps {
  // number entries at select
  entries: string;
  // component select entries
  onSelectEntries: (entries: string) => void;
  // component handle change row per page
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
}

export const TableFilter = ({ entries, onSelectEntries, onChangeRowsPerPage }: IProps) => {
  return (
    <Box
      sx={{
        paddingBottom: '15px',
        borderBottom: '1px solid #e9e9e9',
      }}
    >
      <Grid container spacing={1} margin={0} width={'100%'}>
        <Grid item={true} xs={4}>
          <FilterEntries
            entries={entries}
            onSelectEntries={onSelectEntries}
            onChangeRowsPerPage={onChangeRowsPerPage}
          />
        </Grid>
        <Grid item={true} xs={2}>
          <FilterStatus />
        </Grid>
        <Grid item={true} xs={2}>
          <FilterLocation />
        </Grid>
        <Grid item={true} xs={4}>
          <FilterName />
        </Grid>
      </Grid>
    </Box>
  );
};
