// Libs
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableFooter } from '@mui/material';
import { FunctionComponent, memo } from 'react';

// Components
import { OrderRow } from '~/components/Table/OrderRow';

// Constants
import { STATUS } from '~/constants/status';
import { LOCATION } from '~/constants/location';

// Types
import { IUser } from '~/types/user';
import { HeadRow } from '~/components/Table/HeadRow';
import { FooterRow } from '~/components/Table/FooterRow';

interface IProps {
  rows: IUser[];
  page: number;
  onSetPage: (page: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
  filteredStatus: string;
  filteredLocation: string;
  onOpenDialog: (id: number) => void;
}

const filterByStatus = (filteredStatus: string, data: IUser) => {
  return filteredStatus !== STATUS.ANY ? data.status === filteredStatus : data;
};

const filterByLocation = (filteredLocation: string, data: IUser) => {
  return filteredLocation !== LOCATION.ALL ? data.location === filteredLocation : data;
};

export const TableCustomize: FunctionComponent<IProps> = memo(
  ({
    rows,
    page,
    onSetPage,
    rowsPerPage,
    onChangeRowsPerPage,
    filteredStatus,
    filteredLocation,
    onOpenDialog,
  }: IProps) => {
    return (
      <>
        <TableContainer sx={{ maxHeight: '720px' }}>
          <Table stickyHeader>
            <TableHead>
              <HeadRow />
            </TableHead>
            <TableBody>
              {rows
                .filter((row) => filterByStatus(filteredStatus, row))
                .filter((row) => filterByLocation(filteredLocation, row))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <OrderRow key={row.id} index={index} item={row} onOpenDialog={onOpenDialog} />
                ))}
            </TableBody>
            <TableFooter>
              <FooterRow
                count={rows.length}
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
