import { TablePagination, TableRow } from '@mui/material';
import { memo, useCallback } from 'react';

interface IProps {
  count: number;
  rowsPerPage: number;
  page: number;
  onSetPage: (page: number) => void;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
}

export const FooterRow = memo(
  ({ count, page, onSetPage, rowsPerPage, onChangeRowsPerPage }: IProps) => {
    // component handle change page
    const handleChangePage = useCallback(
      (_event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        onSetPage(newPage);
      },
      [onSetPage],
    );

    return (
      <>
        <TableRow>
          <TablePagination
            labelRowsPerPage={false}
            rowsPerPageOptions={[]}
            count={count}
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
      </>
    );
  },
);

FooterRow.displayName = 'FooterRow';
