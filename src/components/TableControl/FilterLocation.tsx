// Libs
import { Box, SelectChangeEvent, Typography, useTheme } from '@mui/material';
import { FunctionComponent, memo, useCallback, useState } from 'react';
import { locationArr } from '~/constants/location';
import { FormControlCustomize } from '../FormControlCustomize';

interface IProps {
  onFilteredLocation: (location: string) => void;
}

export const FilterLocation: FunctionComponent<IProps> = memo(({ onFilteredLocation }: IProps) => {
  const theme = useTheme();
  const [location, setLocation] = useState('All');

  const handleChange = useCallback(
    (event: SelectChangeEvent) => {
      setLocation(event.target.value);
      onFilteredLocation(event.target.value);
    },
    [onFilteredLocation],
  );

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Typography
        sx={{ fontSize: '13px', paddingRight: '5px' }}
        color={theme.palette.primary.light}
      >
        Location
      </Typography>
      <FormControlCustomize
        arrValue={locationArr}
        selectValue={location}
        onHandleChange={handleChange}
        formStyle={{ minWidth: '110px' }}
        itemStyle={{ fontSize: '16px', color: theme.palette.primary.light }}
      />
    </Box>
  );
});

FilterLocation.displayName = 'FilterLocation';
