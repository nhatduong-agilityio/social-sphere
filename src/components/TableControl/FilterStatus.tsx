// Libs
import { Box, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { FunctionComponent, memo, useCallback, useState } from 'react';
import FilterAltSharpIcon from '@mui/icons-material/FilterAltSharp';

// Constants
import { STATUS, statusArr } from '~/constants/status';

// Components
import { FormControlCustomize } from '@components/FormControlCustomize';

interface IProps {
  onFilteredStatus: (status: string) => void;
}

export const FilterStatus: FunctionComponent<IProps> = memo(({ onFilteredStatus }: IProps) => {
  const theme = useTheme();
  const [status, setStatus] = useState(STATUS.ANY);

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setStatus(event.target.value);
      onFilteredStatus(event.target.value);
    },
    [onFilteredStatus],
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
      <FilterAltSharpIcon sx={{ fontSize: '18px', color: theme.palette.primary.light }} />
      <Typography
        sx={{ fontSize: '13px', padding: '0 10px 0 30px' }}
        color={theme.palette.primary.light}
      >
        Status
      </Typography>
      <FormControlCustomize
        arrValue={statusArr}
        selectValue={status}
        onHandleChange={handleChange}
        formStyle={{ minWidth: '110px' }}
        itemStyle={{ fontSize: '16px', color: theme.palette.primary.light }}
      />
    </Box>
  );
});

FilterStatus.displayName = 'FilterStatus';
