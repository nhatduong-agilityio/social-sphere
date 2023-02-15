import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { TableFooter, TablePagination } from '@mui/material';
import { ItemOrder } from './ItemOrder';

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

function createData(
  name: string,
  calories: number,
  fat: number,
  status?: string,
  protein?: number,
) {
  return { name, calories, fat, status, protein };
}

const rows = [
  createData('Cupcake', 305, 3.7, 'Delivered', 4.3),
  createData('Donut', 452, 25.0, 'Shipped', 4.9),
  createData('Eclair', 262, 16.0, 'Delivered', 6.0),
  createData('Frozen yoghurt', 159, 6.0, 'Cancelled', 4.0),
  createData('Gingerbread', 356, 16.0, 'Cancelled', 3.9),
  createData('Honeycomb', 408, 3.2, 'Pending', 6.5),
  createData('Ice cream sandwich', 237, 9.0, 'Pending', 4.3),
  createData('Jelly Bean', 375, 0.0, 'Cancelled', 0.0),
  createData('KitKat', 518, 26.0, 'Shipped', 7.0),
  createData('Lollipop', 392, 0.2, 'Cancelled', 0.0),
  createData('Marshmallow', 318, 0, 'Shipped', 2.0),
  createData('Nougat', 360, 19.0, 'Delivered', 37.0),
  createData('Oreo', 437, 18.0, 'Delivered', 4.0),
  createData('Ice cream sandwich', 237, 9.0, 'Delivered', 4.3),
  createData('Jelly Bean', 375, 0.0, 'Shipped', 0.0),
  createData('KitKat', 518, 26.0, 'Shipped', 7.0),
  createData('Lollipop', 392, 0.2, 'Cancelled', 0.0),
  createData('Marshmallow', 318, 0, 'Shipped', 2.0),
  createData('Nougat', 360, 19.0, 'Shipped', 37.0),
  createData('Oreo', 437, 18.0, 'Delivered', 4.0),
];

interface IProps {
  page: number;
  onSetPage: (page: number) => void;
  rowsPerPage: number;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
  filteredStatus: string;
}

export const CustomizedTables = ({
  page,
  onSetPage,
  rowsPerPage,
  onChangeRowsPerPage,
  filteredStatus,
}: IProps) => {
  // component handle change page
  const handleChangePage = (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) =>
    onSetPage(newPage);

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
              .filter((valueFilter) => {
                // console.log(value);
                if (filteredStatus != 'Any') {
                  return valueFilter.status === filteredStatus;
                } else {
                  return rows;
                }
              })
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <StyledTableRow key={index}>
                  <ItemOrder index={index} data={row} />
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
                // ActionsComponent={() => <h1>title</h1>}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};
