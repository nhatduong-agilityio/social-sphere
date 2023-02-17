import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import DialogTitle from '@mui/material/DialogTitle';
import { ChangeEvent, FunctionComponent, memo, useContext, useEffect, useState } from 'react';
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
import { IUser } from '~/types/user';
import { IUserContext, UserContext } from '~/store/providers/user';

interface IProps {
  openDialog: boolean;
  orderSelected: IUser;
  onCloseDialog: () => void;
}

const StyledBadgeDot = styled(Badge)(() => ({
  [`& .${badgeClasses.dot}`]: {
    width: 10,
    height: 10,
    borderRadius: '50%',
  },
}));

const useUsers = () => useContext<IUserContext>(UserContext);

export const FormDialog: FunctionComponent<IProps> = memo(
  ({ openDialog, orderSelected, onCloseDialog }: IProps) => {
    const { handleUpdateUser, handleDeleteUser } = useUsers();

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [netAmount, setNetAmount] = useState(parseInt(''));

    useEffect(() => {
      setName(orderSelected.name);
      setDate(orderSelected.orderDate);
      setLocation(orderSelected.location);
      setStatus(orderSelected.status);
      setNetAmount(orderSelected.netAmount);
    }, [
      orderSelected.location,
      orderSelected.name,
      orderSelected.netAmount,
      orderSelected.orderDate,
      orderSelected.status,
    ]);

    const handleChangeName = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setName(event.target.value);
    };

    const handleChange = (newValue: Dayjs | null) => {
      setDate(`${newValue}`);
    };

    const handleChangeLocation = (event: SelectChangeEvent) => {
      setLocation(event.target.value);
    };

    const handleChangeStatus = (event: SelectChangeEvent) => {
      setStatus(event.target.value);
    };

    const handleChangeNetAmount = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setNetAmount(parseInt(event.target.value));
    };

    const onHandleUpdate = () => {
      const valueUpdate: IUser = {
        id: orderSelected.id,
        name: name,
        avatar: orderSelected.avatar,
        location: location,
        orderDate: date,
        status: status,
        netAmount: netAmount,
      };

      handleUpdateUser(valueUpdate);
    };

    const onHandleDelete = () => {
      handleDeleteUser(orderSelected.id);
    };

    return (
      <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
        <DialogTitle>Order Detail of {orderSelected.name}</DialogTitle>
        <DialogContent>
          <Customer customer={orderSelected} />
          <Stack spacing={3}>
            <TextField
              sx={{
                fontSize: '13px',
              }}
              margin='dense'
              id='name'
              label='Name customer'
              type='text'
              fullWidth
              variant='standard'
              onChange={handleChangeName}
              value={name || ''}
            />
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
            <TextField
              margin='dense'
              id='netAmount'
              label='Net Amount'
              type='text'
              fullWidth
              variant='standard'
              value={netAmount || ''}
              onChange={handleChangeNetAmount}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button color='warning' onClick={onCloseDialog} variant='outlined'>
            Cancel
          </Button>
          <Button color='error' onClick={onHandleDelete} variant='outlined'>
            Delete
          </Button>
          <Button color='info' onClick={onHandleUpdate} variant='outlined'>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
