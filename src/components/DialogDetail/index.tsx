import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FunctionComponent,
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Customer } from '../BoxContent/Customer';
import { Stack } from '@mui/material';
import { IUser } from '~/types/user';
import { IUserContext, UserContext } from '~/store/providers/user';
import { NameContent } from './NameContent';
import { LocationContent } from './LocationContent';
import { DateContent } from './DateContent';
import { StatusContent } from './StatusContent';
import { NetAmountContent } from './NetAmountContent';

interface IProps {
  openDialog: boolean;
  orderSelected: number;
  onCloseDialog: () => void;
}

const useUsers = () => useContext<IUserContext>(UserContext);

const filterOrderSelected = (orderSelected: number, data: IUser[]) => {
  const dataFilter = data.find((item) => item.id === orderSelected);

  return dataFilter;
};

export const FormDialog: FunctionComponent<IProps> = memo(
  ({ openDialog, orderSelected, onCloseDialog }: IProps) => {
    const { users, handleUpdateUser, handleDeleteUser } = useUsers();
    const [rows, setRows] = useState<IUser[]>(users.data ? users.data : ({} as IUser[]));
    const [dataInDiaLog, setDataInDiaLog] = useState<IUser>({} as IUser);

    useEffect(() => {
      if (users.data) {
        setRows(users.data);
      }
    }, [users.data]);

    const filterData = useMemo(
      () => filterOrderSelected(orderSelected, rows),
      [orderSelected, rows],
    );

    const [name, setName] = useState('');
    const [date, setDate] = useState('');
    const [status, setStatus] = useState('');
    const [location, setLocation] = useState('');
    const [netAmount, setNetAmount] = useState(parseInt(''));

    useEffect(() => {
      if (filterData) {
        setDataInDiaLog(filterData);
      }

      setName(dataInDiaLog.name);
      setDate(dataInDiaLog.orderDate);
      setLocation(dataInDiaLog.location);
      setStatus(dataInDiaLog.status);
      setNetAmount(dataInDiaLog.netAmount);
    }, [dataInDiaLog, filterData, orderSelected, rows]);

    const valueUpdate: IUser = useMemo(() => {
      return {
        id: dataInDiaLog.id,
        name: name,
        avatar: dataInDiaLog.avatar,
        location: location,
        orderDate: date,
        status: status,
        netAmount: netAmount,
      };
    }, [dataInDiaLog.avatar, dataInDiaLog.id, date, location, name, netAmount, status]);

    const onHandleUpdate = useCallback(() => {
      handleUpdateUser(valueUpdate);
    }, [handleUpdateUser, valueUpdate]);

    const onHandleDelete = () => {
      handleDeleteUser(dataInDiaLog.id);
      onCloseDialog();
    };

    return (
      <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
        <DialogTitle>Order Detail of {dataInDiaLog.name}</DialogTitle>
        <DialogContent>
          <Customer avatar={dataInDiaLog.avatar} name={dataInDiaLog.name} />
          <Stack spacing={3}>
            <NameContent name={name} onSetName={setName} />

            <LocationContent location={location} onSetLocation={setLocation} />

            <DateContent date={date} onSetDate={setDate} />

            <StatusContent status={status} onSetStatus={setStatus} />

            <NetAmountContent netAmount={netAmount} onSetNetAmount={setNetAmount} />
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
