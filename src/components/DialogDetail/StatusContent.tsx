import {
  Badge,
  badgeClasses,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  styled,
  Typography,
} from '@mui/material';
import { FunctionComponent, memo, useEffect, useState } from 'react';

const StyledBadgeDot = styled(Badge)(() => ({
  [`& .${badgeClasses.dot}`]: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
}));

interface IProps {
  status: string;
  onSetStatus: (status: string) => void;
}

export const StatusContent: FunctionComponent<IProps> = memo(({ status, onSetStatus }: IProps) => {
  const [statusValue, setStatusValue] = useState(status);

  const handleChangeStatus = (event: SelectChangeEvent) => {
    setStatusValue(event.target.value);
  };

  useEffect(() => {
    onSetStatus(statusValue);
  }, [onSetStatus, statusValue]);

  return (
    <FormControl>
      <InputLabel id='demo-dialog-select-label'>Status</InputLabel>
      <Select
        labelId='demo-dialog-select-label'
        id='demo-dialog-select'
        value={status || ''}
        onChange={handleChangeStatus}
        variant='standard'
      >
        <MenuItem value={'Delivered'}>
          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}
          >
            <StyledBadgeDot variant='dot' color='success' />
            <Typography
              component={'p'}
              sx={{
                fontSize: '13px',
                textTransform: 'capitalize',
                marginLeft: '25px',
                paddingTop: '2px',
              }}
            >
              Delivered
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem value={'Shipped'}>
          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}
          >
            <StyledBadgeDot variant='dot' color='info' />
            <Typography
              component={'p'}
              sx={{
                fontSize: '13px',
                textTransform: 'capitalize',
                marginLeft: '25px',
                paddingTop: '2px',
              }}
            >
              Shipped
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem value={'Cancelled'}>
          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}
          >
            <StyledBadgeDot variant='dot' color='error' />
            <Typography
              component={'p'}
              sx={{
                fontSize: '13px',
                textTransform: 'capitalize',
                marginLeft: '25px',
                paddingTop: '2px',
              }}
            >
              Cancelled
            </Typography>
          </Stack>
        </MenuItem>
        <MenuItem value={'Pending'}>
          <Stack
            direction='row'
            sx={{ display: 'flex', alignItems: 'center', paddingLeft: '10px' }}
          >
            <StyledBadgeDot variant='dot' color='warning' />
            <Typography
              component={'p'}
              sx={{
                fontSize: '13px',
                textTransform: 'capitalize',
                marginLeft: '25px',
                paddingTop: '2px',
              }}
            >
              Pending
            </Typography>
          </Stack>
        </MenuItem>
      </Select>
    </FormControl>
  );
});

StatusContent.displayName = 'StatusContent';
