import { styled, TableCell, tableCellClasses, TableRow } from '@mui/material';
import { memo } from 'react';

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

export const HeadRow = memo(() => {
  return (
    <>
      <TableRow>
        <StyledTableCell>#</StyledTableCell>
        <StyledTableCell>User</StyledTableCell>
        <StyledTableCell align='left'>Location</StyledTableCell>
        <StyledTableCell align='left'>Order Date</StyledTableCell>
        <StyledTableCell align='left'>Status</StyledTableCell>
        <StyledTableCell align='left'>Net Amount</StyledTableCell>
        <StyledTableCell align='left'>Action</StyledTableCell>
      </TableRow>
    </>
  );
});

HeadRow.displayName = 'HeadRow';
