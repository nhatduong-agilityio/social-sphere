// Libs
import { Box, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { FunctionComponent, memo, useCallback } from 'react';
import { entriesArr } from '~/constants/entries';
import { FormControlCustomize } from '../FormControlCustomize';

interface IProps {
  entries: string;
  onSelectEntries: (entries: string) => void;
  onChangeRowsPerPage: (rowsPerPage: number, page: number) => void;
}

export const FilterEntries: FunctionComponent<IProps> = memo(
  ({ entries, onSelectEntries, onChangeRowsPerPage }: IProps) => {
    const theme = useTheme();

    // component handle select entries and change row per page.
    const handleChange = useCallback(
      (event: SelectChangeEvent) => {
        onSelectEntries(event.target.value);
        onChangeRowsPerPage(parseInt(event.target.value, 10), 0);
      },
      [onChangeRowsPerPage, onSelectEntries],
    );

    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
        <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
          Show
        </Typography>
        <FormControlCustomize
          arrValue={entriesArr}
          selectValue={entries}
          onHandleChange={handleChange}
          formStyle={{ minWidth: '60px', padding: '0 6px' }}
          itemStyle={{ fontSize: '16px', color: theme.palette.primary.light }}
        />
        <Typography sx={{ fontSize: '13px' }} color={theme.palette.primary.light}>
          entries
        </Typography>
      </Box>
    );
  },
);

FilterEntries.displayName = 'FilterEntries';
