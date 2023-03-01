// Libs
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, FunctionComponent, memo, useMemo } from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';

// Types
import { IUser } from '~/types/user';

// Hooks
import { useUsers } from '~/hooks/useUsers';

// Components
import { User } from '~/components/User';
import { LocationContent } from '~/components/Dialog/LocationContent';
import { StatusContent } from '~/components/Dialog/StatusContent';
import { InputContent } from '~/components/Dialog/InputContent';

interface IProps {
  openDialog: boolean;
  orderSelected: number;
  onCloseDialog: () => void;
}
const filterOrderSelected = (orderSelected: number, data: IUser[] | undefined) => {
  const dataFilter = data?.find((item) => item.id === orderSelected);

  return dataFilter;
};

export const FormDialog: FunctionComponent<IProps> = memo(
  ({ openDialog, orderSelected, onCloseDialog }: IProps) => {
    const { users, error, isLoading, updating, deleting } = useUsers();

    const filterData = useMemo(
      () => filterOrderSelected(orderSelected, users),
      [orderSelected, users],
    );

    if (!filterData || error) {
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

      const valueForm = Object.fromEntries(formData.entries());

      const name = valueForm.name.toString();
      const location = valueForm.location.toString();
      const date = valueForm.date.toString();
      const status = valueForm.status.toString();
      const price = valueForm.price.toString();

      const valueUpdate = {
        id: orderSelected,
        name: name ? name : nameInit,
        avatar: avatarInit,
        location: location ? location : locationInit,
        orderDate: date ? date : orderDateInit,
        status: status ? status : statusInit,
        netAmount: price ? parseFloat(price) : netAmountInit,
      };

      updating(valueUpdate);
      onCloseDialog();
    };

    // handle delete item by id
    const onHandleDelete = () => {
      deleting(orderSelected);
      onCloseDialog();
    };

    return (
      <Dialog open={openDialog} onClose={onCloseDialog} fullWidth>
        <form onSubmit={onHandleUpdate}>
          <DialogTitle>Order Detail of {nameInit}</DialogTitle>
          <DialogContent>
            <User
              avatar={avatarInit}
              name={nameInit}
              spacing={2}
              styleStack={{ display: 'flex', alignItems: 'center' }}
              styleAvatar={{ width: '40px', height: '40px' }}
              styleText={{
                fontWeight: 'Bold',
                fontSize: '13px',
                textTransform: 'capitalize',
              }}
            />
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
            <Button color='error' onClick={onHandleDelete} variant='outlined' disabled={isLoading}>
              Delete
            </Button>
            <Button color='info' type='submit' variant='outlined' disabled={isLoading}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
