// Libs
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {
  FormEvent,
  FunctionComponent,
  memo,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';

// Types
import { IUser } from '~/types/user';

// Store
import { IUserContext, UserContext } from '~/store/providers/user';

// Components
import { Customer } from '@components/BoxContent/Customer';
import { NameContent } from '@components/DialogDetail/NameContent';
import { LocationContent } from '@components/DialogDetail/LocationContent';
import { DateContent } from '@components/DialogDetail/DateContent';
import { StatusContent } from '@components/DialogDetail/StatusContent';
import { NetAmountContent } from '@components/DialogDetail/NetAmountContent';

interface IProps {
  openDialog: boolean;
  orderSelected: number;
  onCloseDialog: () => void;
}

const useUsers = () => useContext<IUserContext>(UserContext);

// function helper filter item by id
const filterOrderSelected = (orderSelected: number, data: IUser[]) => {
  const dataFilter = data.find((item) => item.id === orderSelected);

  return dataFilter;
};

export const FormDialog: FunctionComponent<IProps> = memo(
  ({ openDialog, orderSelected, onCloseDialog }: IProps) => {
    const { users, handleUpdateUser, handleDeleteUser } = useUsers();
    const [rows, setRows] = useState<IUser[]>(users.data ? users.data : ({} as IUser[]));

    useEffect(() => {
      if (users.data) {
        setRows(users.data);
      }
    }, [users.data]);

    const filterData = useMemo(
      () => filterOrderSelected(orderSelected, rows),
      [orderSelected, rows],
    );

    if (!filterData) {
      return (
        <Snackbar open={true} autoHideDuration={2000}>
          <Alert severity='warning'>Not found!</Alert>
        </Snackbar>
      );
    }

    const name = filterData.name;
    const avatar = filterData.avatar;
    const location = filterData.location;
    const orderDate = filterData.orderDate;
    const status = filterData.status;
    const netAmount = filterData.netAmount;

    // handle update item
    const onHandleUpdate = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const valueFrom = Object.fromEntries(formData.entries());

      const nameValue = valueFrom.inputName.toString();
      const locationValue = valueFrom.locationSelected.toString();
      const orderDateValue = valueFrom.orderDate.toString();
      const statusValue = valueFrom.statusSelected.toString();
      const netAmountValue = valueFrom.netAmount.toString();

      const valueUpdate = {
        id: orderSelected,
        name: nameValue ? nameValue : name,
        avatar: avatar,
        location: locationValue ? locationValue : location,
        orderDate: orderDateValue ? orderDateValue : orderDate,
        status: statusValue ? statusValue : status,
        netAmount: netAmountValue ? parseInt(netAmountValue) : netAmount,
      };

      handleUpdateUser(valueUpdate);
    };

    // handle delete item by id
    const onHandleDelete = () => {
      handleDeleteUser(filterData.id);
      onCloseDialog();
    };

    return (
      <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
        <form onSubmit={onHandleUpdate}>
          <DialogTitle>Order Detail of {name}</DialogTitle>
          <DialogContent>
            <Customer avatar={avatar} name={name} />
            <Stack spacing={3}>
              <NameContent name={name} />
              <LocationContent location={location} />
              <DateContent date={orderDate} />
              <StatusContent status={status} />
              <NetAmountContent netAmount={netAmount} />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color='warning' onClick={onCloseDialog} variant='outlined'>
              Cancel
            </Button>
            <Button color='error' onClick={onHandleDelete} variant='outlined'>
              Delete
            </Button>
            <Button color='info' type='submit' variant='outlined'>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
