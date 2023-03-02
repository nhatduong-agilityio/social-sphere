// Libs
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { Alert, Snackbar, TableFooter } from '@mui/material';
import { FunctionComponent, memo } from 'react';

// Constants
import { STATUS } from '~/constants/status';
import { LOCATION } from '~/constants/location';

// Types
import { IUser } from '~/types/user';

// Hooks
import { useUsers } from '~/hooks/useUsers';

// Components
import { OrderRow } from '@components/Table/OrderRow';
import { HeadRow } from '@components/Table/HeadRow';
import { FooterRow } from '@components/Table/FooterRow';

interface IProps {
  page: number;
  onSetPage: (page: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
  filteredStatus: string;
  filteredLocation: string;
  searchName: string;
}

const filterByStatus = (filteredStatus: string, data: IUser) => {
  return filteredStatus !== STATUS.ANY ? data.status === filteredStatus : data;
};

const filterByLocation = (filteredLocation: string, data: IUser) => {
  return filteredLocation !== LOCATION.ALL ? data.location === filteredLocation : data;
};

const filterByName = (searchName: string, data: IUser) => {
  return data.name.toLowerCase().includes(searchName.toLowerCase());
};

export const TableCustomize: FunctionComponent<IProps> = memo(
  ({
    page,
    onSetPage,
    rowsPerPage,
    onChangeRowsPerPage,
    filteredStatus,
    filteredLocation,
    searchName,
  }: IProps) => {
    const { users, error, isLoading } = useUsers();

    if (isLoading) {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity='warning'>Loading!</Alert>
        </Snackbar>
      );
    }

    if (!users || error) {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity='warning'>Not found!</Alert>
        </Snackbar>
      );
    }

    return (
      <>
        <TableContainer sx={{ maxHeight: '720px' }}>
          <Table stickyHeader>
            <TableHead>
              <HeadRow />
            </TableHead>
            <TableBody>
              {users
                .filter((row) => filterByStatus(filteredStatus, row))
                .filter((row) => filterByLocation(filteredLocation, row))
                .filter((row) => filterByName(searchName, row))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <OrderRow key={row.id} index={index} item={row} />
                ))}
            </TableBody>
            <TableFooter>
              <FooterRow
                count={users.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onSetPage={onSetPage}
                onChangeRowsPerPage={onChangeRowsPerPage}
              />
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    );
  },
);

TableCustomize.displayName = 'TableCustomize';
