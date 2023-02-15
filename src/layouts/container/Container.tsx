import { Box, Container, useTheme } from '@mui/material';
import { useState } from 'react';
import { AppBarContent } from '~/components/AppBar';
import { CustomizedTables } from '~/components/BoxContent';
import { TableFilter } from '~/components/BoxControl';

export const LayoutContainer = () => {
  const theme = useTheme();
  const [entries, setEntries] = useState('5');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(Number(entries));

  /**
   * component handle change row per page
   * @param rowsPerPage row number want to show.
   * @param page page number of pagination
   */
  const onChangeRowsPerPage = (rowsPerPage: number, page: number) => {
    setRowsPerPage(rowsPerPage);
    setPage(page);
  };

  return (
    <Container maxWidth='xl'>
      <AppBarContent />
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
        />
        <CustomizedTables
          page={page}
          onSetPage={setPage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={onChangeRowsPerPage}
        />
      </Box>
    </Container>
  );
};
