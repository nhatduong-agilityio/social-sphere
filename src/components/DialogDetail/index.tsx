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
import { LocationContent } from '@components/DialogDetail/LocationContent';
import { StatusContent } from '@components/DialogDetail/StatusContent';
import { InputContent } from '@components/DialogDetail/InputContent';

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

    const nameInit = filterData.name;
    const avatarInit = filterData.avatar;
    const locationInit = filterData.location;
    const orderDateInit = filterData.orderDate;
    const statusInit = filterData.status;
    const netAmountInit = filterData.netAmount;

    // handle update item
    const onHandleUpdate = (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);

      const valueFrom = Object.fromEntries(formData.entries());

      const name = valueFrom.name.toString();
      const location = valueFrom.location.toString();
      const date = valueFrom.date.toString();
      const status = valueFrom.status.toString();
      const price = valueFrom.price.toString();

      const valueUpdate = {
        id: orderSelected,
        name: name ? name : nameInit,
        avatar: avatarInit,
        location: location ? location : locationInit,
        orderDate: date ? date : orderDateInit,
        status: status ? status : statusInit,
        netAmount: price ? parseFloat(price) : netAmountInit,
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
          <DialogTitle>Order Detail of {nameInit}</DialogTitle>
          <DialogContent>
            <Customer avatar={avatarInit} name={nameInit} />
            <Stack spacing={3}>
              <InputContent nameInput={'name'} valueInput={nameInit} />
              <LocationContent location={locationInit} />
              <InputContent
                nameInput={'date'}
                valueInput={orderDateInit}
                type={'date'}
                shrink={true}
              />
              <StatusContent status={statusInit} />
              <InputContent nameInput={'price'} valueInput={netAmountInit} />
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
