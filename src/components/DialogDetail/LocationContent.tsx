import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from '@mui/material';
import { FunctionComponent, memo, useEffect, useState } from 'react';

interface IProps {
  location: string;
  onSetLocation: (location: string) => void;
}

export const LocationContent: FunctionComponent<IProps> = memo(
  ({ location, onSetLocation }: IProps) => {
    const [locationValue, setLocationValue] = useState(location);

    const handleChangeLocation = (event: SelectChangeEvent) => {
      setLocationValue(event.target.value);
    };

    useEffect(() => {
      onSetLocation(locationValue);
    }, [locationValue, onSetLocation]);

    return (
      <FormControl>
        <InputLabel id='demo-dialog-select-label'>Location</InputLabel>
        <Select
          labelId='demo-dialog-select-label'
          id='demo-dialog-select'
          value={location || ''}
          onChange={handleChangeLocation}
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
  },
);

LocationContent.displayName = 'LocationContent';
