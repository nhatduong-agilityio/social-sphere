import { ChangeEvent, useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Customer } from './Customer';
import { Status } from './Status';
import { ActionButton } from './ActionButton';
import { Box, IconButton, Paper, TableFooter, TablePagination } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import FormDialog from '../DialogDetail';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));

function createData(name: string, calories: number, fat: number, carbs?: number, protein?: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Donut', 452, 25.0, 51, 4.9),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
  createData('Honeycomb', 408, 3.2, 87, 6.5),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Jelly Bean', 375, 0.0, 94, 0.0),
  createData('KitKat', 518, 26.0, 65, 7.0),
  createData('Lollipop', 392, 0.2, 98, 0.0),
  createData('Marshmallow', 318, 0, 81, 2.0),
  createData('Nougat', 360, 19.0, 9, 37.0),
  createData('Oreo', 437, 18.0, 63, 4.0),
];

interface IProps {
  page: number;
  onSetPage: (page: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
}

export const CustomizedTables = ({ page, onSetPage, rowsPerPage, onChangeRowsPerPage }: IProps) => {
  const [dialogForm, setDialogForm] = useState(false);

  // component handle change page
  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    onSetPage(newPage);

  const handleClickOpenDialog = () => {
    setDialogForm(true);
  };

  return (
    <>
      {dialogForm && <FormDialog dialogForm={dialogForm} onHandleDialogForm={setDialogForm} />}
      <TableContainer>
        <Table>
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
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component='th' scope='row'>
                  {index + 1}
                </StyledTableCell>
                <StyledTableCell component='th' scope='row'>
                  <Customer customer={row.name} />
                </StyledTableCell>
                <StyledTableCell align='left'>{row.calories}</StyledTableCell>
                <StyledTableCell align='left'>{row.fat}</StyledTableCell>
                <StyledTableCell align='left'>
                  <Status status={'Shipped'} />
                </StyledTableCell>
                <StyledTableCell align='left'>{row.protein}</StyledTableCell>
                <StyledTableCell align='left'>
                  <ActionButton onHandleOpenDialog={handleClickOpenDialog} />
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 15, 20]}
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
                // ActionsComponent={() => <h1>title</h1>}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
