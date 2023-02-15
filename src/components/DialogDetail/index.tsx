import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FunctionComponent, memo } from 'react';
import { Customer } from '../BoxContent/Customer';

interface IProps {
  open: boolean;
  data: any;
  onHandleDialogForm: (dialogForm: { open: boolean; data?: any }) => void;
}

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

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{data.name}</DialogTitle>
        <DialogContent>
          <Customer customer={data} />
          <DialogContentText>{data.name}</DialogContentText>
          <TextField
            margin='dense'
            id='name'
            label='Email Address'
            type='email'
            fullWidth
            variant='standard'
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    );
  },
);

FormDialog.displayName = 'FormDialog';
