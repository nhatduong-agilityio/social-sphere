// Libs
import { Box, Grid } from '@mui/material';
import { FunctionComponent, memo } from 'react';

// Types
import { IUser } from '~/types/user';

// Components
import { FilterEntries } from '@components/BoxControl/FilterEntries';
import { FilterLocation } from '@components/BoxControl/FilterLocation';
import { FilterName } from '@components/BoxControl/FilterName';
import { FilterStatus } from '@components/BoxControl/FilterStatus';

interface IProps {
  // number entries at select
  entries: string;
  // component select entries
  onSelectEntries: (entries: string) => void;
  // component handle change row per page
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
  onFilteredStatus: (status: string) => void;
  onFilteredLocation: (location: string) => void;
  rows: IUser[];
  onRows: (rows: IUser[]) => void;
}

export const BoxControl: FunctionComponent<IProps> = memo(
  ({
    entries,
    onSelectEntries,
    onChangeRowsPerPage,
    onFilteredStatus,
    onFilteredLocation,
    onRows,
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
            <FilterName onRows={onRows} />
          </Grid>
        </Grid>
      </Box>
    );
  },
);

BoxControl.displayName = 'BoxControl';
