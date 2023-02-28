// Libs
import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FunctionComponent, memo } from 'react';
import { LOCATION, locationArr } from '~/constants/location';

interface IProps {
  location: string;
}

export const LocationContent: FunctionComponent<IProps> = memo(({ location }: IProps) => {
  return (
    <FormControl>
      <InputLabel id='demo-dialog-select-label' sx={{ textTransform: 'uppercase' }}>
        Location
      </InputLabel>
      <Select
        key={`location-${location}`}
        labelId='demo-dialog-select-label'
        name='location'
        defaultValue={location}
        variant='standard'
      >
        {locationArr.map((item) => {
          if (item !== LOCATION.ALL) {
            return (
              <MenuItem key={item} value={item}>
                <Typography
                  component={'p'}
                  sx={{
                    fontSize: '13px',
                    textTransform: 'capitalize',
                    paddingTop: '2px',
                  }}
                >
                  {item}
                </Typography>
              </MenuItem>
            );
          }
        })}
      </Select>
    </FormControl>
  );
});

LocationContent.displayName = 'LocationContent';
