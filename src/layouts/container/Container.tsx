import { Box, Container, useTheme } from '@mui/material';
import { useCallback, useState } from 'react';
import { AppBarContent } from '~/components/AppBar';
import { CustomizedTables } from '~/components/BoxContent';
import { TableFilter } from '~/components/BoxControl';
import { LOCATION } from '~/constant/location';
import { STATUS } from '~/constant/status';
import { IData } from '~/types/data';

const createData = (
  name: string,
  location: string,
  fat: number,
  status: string,
  netAmount: number,
): IData => {
  return { name, location, fat, status, netAmount };
};

export const originalRows = [
  createData('Cupcake', 'New York', 3.7, 'Delivered', 4.3),
  createData('Donut', 'Berlin', 25.0, 'Shipped', 4.9),
  createData('Eclair', 'Berlin', 16.0, 'Delivered', 6.0),
  createData('Frozen yoghurt', 'Paris', 6.0, 'Cancelled', 4.0),
  createData('Gingerbread', 'London', 16.0, 'Cancelled', 3.9),
  createData('Honeycomb', 'London', 3.2, 'Pending', 6.5),
  createData('Ice cream sandwich', 'Madrid', 9.0, 'Pending', 4.3),
  createData('Jelly Bean', 'New York', 0.0, 'Cancelled', 0.0),
  createData('KitKat', 'Berlin', 26.0, 'Shipped', 7.0),
  createData('Lollipop', 'Other', 0.2, 'Cancelled', 0.0),
  createData('Marshmallow', 'London', 0, 'Shipped', 2.0),
  createData('Nougat', 'Other', 19.0, 'Delivered', 37.0),
  createData('Oreo', 'New York', 18.0, 'Delivered', 4.0),
  createData('Ice cream sandwich', 'Madrid', 9.0, 'Delivered', 4.3),
  createData('Jelly Bean', 'New York', 0.0, 'Shipped', 0.0),
  createData('KitKat', 'Berlin', 26.0, 'Shipped', 7.0),
  createData('Lollipop', 'Paris', 0.2, 'Cancelled', 0.0),
  createData('Marshmallow', 'London', 0, 'Shipped', 2.0),
  createData('Nougat', 'Paris', 19.0, 'Shipped', 37.0),
  createData('Oreo', 'New York', 18.0, 'Delivered', 4.0),
];

export const LayoutContainer = () => {
  const theme = useTheme();
  const [entries, setEntries] = useState('5');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(entries));
  const [filteredStatus, setFilteredStatus] = useState(STATUS.ANY);
  const [filteredLocation, setFilteredLocation] = useState(LOCATION.ALL);
  const [rows, setRows] = useState(originalRows);

  /**
   * component handle change row per page
   * @param rowsPerPage row number want to show.
   * @param page page number of pagination
   */
  const onChangeRowsPerPage = (rowsPerPage: number, page: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  const handleRefresh = useCallback(() => {
    setRows(originalRows);
  }, []);

  return (
    <Container maxWidth='xl'>
      <AppBarContent onHandleRefresh={handleRefresh} />
      <Box
        sx={{
          width: '100%',
          padding: '15px 25px 20px 25px ',
          backgroundColor: `${theme.palette.background.default}`,
        }}
      >
        <TableFilter
          entries={entries}
          onSelectEntries={setEntries}
          onChangeRowsPerPage={onChangeRowsPerPage}
          onFilteredStatus={setFilteredStatus}
          onFilteredLocation={setFilteredLocation}
          rows={rows}
          onRows={setRows}
        />
        <CustomizedTables
          rows={rows}
          page={page}
          onSetPage={setPage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          filteredStatus={filteredStatus}
          filteredLocation={filteredLocation}
        />
      </Box>
    </Container>
  );
};
