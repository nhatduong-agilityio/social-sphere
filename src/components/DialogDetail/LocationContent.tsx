import { FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { FunctionComponent, memo } from 'react';

interface IProps {
  location: string;
}

export const LocationContent: FunctionComponent<IProps> = memo(({ location }: IProps) => {
  return (
    <FormControl>
      <InputLabel id='demo-dialog-select-label'>Location</InputLabel>
      <Select
        key={`location-${location}`}
        labelId='demo-dialog-select-label'
        name='locationSelected'
        defaultValue={location}
        variant='standard'
      >
        <MenuItem value={'Other'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            Other
          </Typography>
        </MenuItem>
        <MenuItem value={'Berlin'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            Berlin
          </Typography>
        </MenuItem>
        <MenuItem value={'London'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            London
          </Typography>
        </MenuItem>
        <MenuItem value={'Madrid'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            Madrid
          </Typography>
        </MenuItem>
        <MenuItem value={'New York'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            New York
          </Typography>
        </MenuItem>
        <MenuItem value={'Paris'}>
          <Typography
            component={'p'}
            sx={{
              fontSize: '13px',
              textTransform: 'capitalize',
              paddingTop: '2px',
            }}
          >
            Paris
          </Typography>
        </MenuItem>
      </Select>
    </FormControl>
  );
});

LocationContent.displayName = 'LocationContent';
