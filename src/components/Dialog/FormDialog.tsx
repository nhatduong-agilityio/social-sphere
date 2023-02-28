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

// Components
import { User } from '~/components/User';
import { LocationContent } from '~/components/Dialog/LocationContent';
import { StatusContent } from '~/components/Dialog/StatusContent';
import { InputContent } from '~/components/Dialog/InputContent';
import { API } from '~/constants/url';
import { useSWRConfig } from 'swr';
import useSWRMutation from 'swr/mutation';
import { fetcher } from '~/services/fetcher';
import { putData } from '~/services/putData';
import useSWR from 'swr';

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
    const { data } = useSWR<IUser[]>(API.PATH_USERS, fetcher);
    const { trigger, isMutating } = useSWRMutation(
      API.PATH_USERS + `/${orderSelected}`,
      putData<IUser>,
    );
    const { mutate, cache } = useSWRConfig();

    const filterData = useMemo(
      () => filterOrderSelected(orderSelected, data),
      [orderSelected, data],
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

      const dataUpdate = data?.map((data) => {
        if (data.id === valueUpdate.id) {
          return valueUpdate;
        } else {
          return data;
        }
      });

      trigger(valueUpdate);
      mutate(API.PATH_USERS, dataUpdate, false);
      onCloseDialog();
      cache.delete(API.PATH_USERS + `/${orderSelected}`);
      // handleUpdateUser(valueUpdate);
    };

    // handle delete item by id
    const onHandleDelete = () => {
      // handleDeleteUser(filterData.id);
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
            <Button color='error' onClick={onHandleDelete} variant='outlined'>
              Delete
            </Button>
            <Button color='info' type='submit' variant='outlined' disabled={isMutating}>
              Update
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
