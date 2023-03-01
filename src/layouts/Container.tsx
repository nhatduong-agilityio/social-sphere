// Libs
import { Box, Container, useTheme } from '@mui/material';
import { FunctionComponent, memo, useCallback, useState } from 'react';

// Constants
import { LOCATION } from '~/constants/location';
import { STATUS } from '~/constants/status';
import { ENTRY_DEFAULT } from '~/constants/entries';

// Components
import { AppBarCustomize } from '~/components/AppBar/AppBarCustomize';
import { TableCustomize } from '~/components/Table/TableCustomize';
import { TableControl } from '~/components/TableControl/TableControl';

export const LayoutContainer: FunctionComponent = memo(() => {
  const theme = useTheme();
  const [entries, setEntries] = useState(ENTRY_DEFAULT);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(entries));
  const [filteredStatus, setFilteredStatus] = useState(STATUS.ANY);
  const [filteredLocation, setFilteredLocation] = useState(LOCATION.ALL);
  const [searchName, setSearchName] = useState('');

  /**
   * component handle change row per pages
   * @param rowsPerPage row number want to show.
   * @param page page number of pagination
   */
  const onChangeRowsPerPage = useCallback((rowsPerPage: number, page: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(page);
  }, []);

  const handleRefresh = () => {
    setSearchName('');
  };

  return (
    <>
      <Container maxWidth='xl'>
        <AppBarCustomize onHandleRefresh={handleRefresh} />
        <Box
          sx={{
            width: '100%',
            padding: '15px 25px 20px 25px ',
            backgroundColor: theme.palette.background.default,
          }}
        >
          <TableControl
            entries={entries}
            onSelectEntries={setEntries}
            onChangeRowsPerPage={onChangeRowsPerPage}
            onFilteredStatus={setFilteredStatus}
            onFilteredLocation={setFilteredLocation}
            onHandleSearch={setSearchName}
          />
          <TableCustomize
            page={page}
            onSetPage={setPage}
            rowsPerPage={rowsPerPage}
            onChangeRowsPerPage={onChangeRowsPerPage}
            filteredStatus={filteredStatus}
            filteredLocation={filteredLocation}
            searchName={searchName}
          />
        </Box>
      </Container>
    </>
  );
});

LayoutContainer.displayName = 'LayoutContainer';
