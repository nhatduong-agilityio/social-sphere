import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent, memo, useState } from 'react';
import { Customer } from '../BoxContent/Customer';
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
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { IData } from '~/types/data';

interface IProps {
  open: boolean;
  data: IData;
  onHandleDialogForm: (dialogForm: { open: boolean; data?: IData }) => void;
}

const StyledBadgeDot = styled(Badge)(() => ({
  [`& .${badgeClasses.dot}`]: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
}));

export const FormDialog: FunctionComponent<IProps> = memo(
  ({ open, data, onHandleDialogForm }: IProps) => {
    /**
     * handle close dialog
     */
    const handleClose = () => {
      onHandleDialogForm({
        open: false,
      });
    };

    const [date, setDate] = useState<Dayjs | null>(dayjs('2014-08-18T21:11:54'));
    const [status, setStatus] = useState('');

    const handleChange = (newValue: Dayjs | null) => {
      setDate(newValue);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
      setStatus(event.target.value);
    };

    return (
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{data.name}</DialogTitle>
        <DialogContent>
          <Customer customer={data} />
          <Stack spacing={2}>
            <TextField
              margin='dense'
              id='name'
              label='Name customer'
              type='text'
              fullWidth
              variant='standard'
            />
            <TextField
              margin='dense'
              id='location'
              label='Location'
              type='text'
              fullWidth
              variant='standard'
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                label='Date desktop'
                inputFormat='MM/DD/YYYY'
                value={date}
                onChange={handleChange}
                renderInput={(params) => <TextField {...params} variant='standard' />}
              />
            </LocalizationProvider>
            <FormControl>
              <InputLabel id='demo-dialog-select-label'>Status</InputLabel>
              <Select
                labelId='demo-dialog-select-label'
                id='demo-dialog-select'
                value={status}
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
            <TextField
              margin='dense'
              id='netAmount'
              label='Net Amount'
              type='text'
              fullWidth
              variant='standard'
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Delete</Button>
          <Button onClick={handleClose}>Update</Button>
        </DialogActions>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
