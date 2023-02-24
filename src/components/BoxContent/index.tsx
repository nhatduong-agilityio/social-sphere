// Libs
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter, TablePagination } from '@mui/material';
import { FunctionComponent, memo, useCallback } from 'react';

// Components
import { ItemOrder } from '@components/BoxContent/ItemOrder';

// Constants
import { STATUS } from '~/constants/status';
import { LOCATION } from '~/constants/location';

// Types
import { IUser } from '~/types/user';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: 13,
    fontWeight: 'Bold',
  },
}));

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

export const CustomizedTables: FunctionComponent<IProps> = memo(
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
    // component handle change page
    const handleChangePage = useCallback(
      (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onSetPage(newPage);
      },
      [onSetPage],
    );

    return (
      <>
        <TableContainer sx={{ maxHeight: '720px' }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <StyledTableCell>#</StyledTableCell>
                <StyledTableCell>Customer</StyledTableCell>
                <StyledTableCell align='left'>Location</StyledTableCell>
                <StyledTableCell align='left'>Order Date</StyledTableCell>
                <StyledTableCell align='left'>Status</StyledTableCell>
                <StyledTableCell align='left'>Net Amount</StyledTableCell>
                <StyledTableCell align='left'>Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .filter((row) => filterByStatus(filteredStatus, row))
                .filter((row) => filterByLocation(filteredLocation, row))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <StyledTableRow key={row.id}>
                    <ItemOrder index={index} item={row} onOpenDialog={onOpenDialog} />
                  </StyledTableRow>
                ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TablePagination
                  labelRowsPerPage={false}
                  rowsPerPageOptions={[]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'rows per page',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={(event) =>
                    onChangeRowsPerPage(parseInt(event.target.value, 10), 0)
                  }
                />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </>
    );
  },
);

CustomizedTables.displayName = 'CustomizedTables';
