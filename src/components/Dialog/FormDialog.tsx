// Libs
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { FormEvent, FunctionComponent, memo, useMemo } from 'react';
import { Alert, Snackbar, Stack } from '@mui/material';
import useSWRMutation from 'swr/mutation';

// Types
import { IUser } from '~/types/user';

// Services
import { request } from '~/services/request';

// Constants
import { API } from '~/constants/url';

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
    const { users, error, mutate } = useUsers();
    const { trigger: updating, isMutating: updateMutating } = useSWRMutation(
      API.PATH_USERS + `/${orderSelected}`,
      request.update<IUser>,
    );
    const { trigger: deleting, isMutating: deleteMutating } = useSWRMutation(
      API.PATH_USERS + `/${orderSelected}`,
      request.delete,
    );
    // const { mutate, cache } = useSWRConfig();

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

      const dataUpdate = users?.map((user) => {
        if (user.id === valueUpdate.id) {
          return valueUpdate;
        } else {
          return user;
        }
      });

      updating(valueUpdate);
      mutate(dataUpdate, false);
      onCloseDialog();
    };

    // handle delete item by id
    const onHandleDelete = () => {
      const newData = users?.filter((user) => user.id !== orderSelected);

      deleting();
      mutate(newData, false);
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
            <Button
              color='error'
              onClick={onHandleDelete}
              variant='outlined'
              disabled={deleteMutating}
            >
              Delete
            </Button>
            <Button color='info' type='submit' variant='outlined' disabled={updateMutating}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
