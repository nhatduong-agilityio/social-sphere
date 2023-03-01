// Libs
import { Box, Grid } from '@mui/material';
import { FunctionComponent, memo } from 'react';

// Components
import { FilterEntries } from '@components/TableControl/FilterEntries';
import { FilterLocation } from '@components/TableControl/FilterLocation';
import { FilterName } from '@components/TableControl/FilterName';
import { FilterStatus } from '@components/TableControl/FilterStatus';

interface IProps {
  // number entries at select
  entries: string;
  // component select entries
  onSelectEntries: (entries: string) => void;
  // component handle change row per page
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
  onFilteredStatus: (status: string) => void;
  onFilteredLocation: (location: string) => void;
  onHandleSearch: (name: string) => void;
}

export const TableControl: FunctionComponent<IProps> = memo(
  ({
    entries,
    onSelectEntries,
    onChangeRowsPerPage,
    onFilteredStatus,
    onFilteredLocation,
    onHandleSearch,
  }: IProps) => {
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
            <FilterStatus onFilteredStatus={onFilteredStatus} />
          </Grid>
          <Grid item={true} xs={2}>
            <FilterLocation onFilteredLocation={onFilteredLocation} />
          </Grid>
          <Grid item={true} xs={4}>
            <FilterName onHandleSearch={onHandleSearch} />
          </Grid>
        </Grid>
      </Box>
    );
  },
);

TableControl.displayName = 'TableControl';
