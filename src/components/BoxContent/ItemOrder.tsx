import { styled, TableCell, tableCellClasses } from '@mui/material';
import { FunctionComponent, memo, useState } from 'react';
import { IData } from '~/types/data';
import { DialogState } from '~/types/dialogForm';
import { FormDialog } from '../DialogDetail';
import { ActionButton } from './ActionButton';
import { Customer } from './Customer';
import { Status } from './Status';

// customize for table cell
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: theme.palette.secondary.dark,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 13,
  },
  [`&.${tableCellClasses.head}`]: {
    fontSize: 13,
    fontWeight: 'Bold',
  },
}));

interface IProps {
  index: number;
  data: IData;
}

export const ItemOrder: FunctionComponent<IProps> = memo(({ index, data }: IProps) => {
  const [dialogForm, setDialogForm] = useState<DialogState>({
    open: false,
  });

  /**
   * handle open dialog with data
   */
  const handleClickOpenDialog = () => {
    setDialogForm({
      open: true,
      data: data,
    });
  };

  return (
    <>
      {dialogForm.open && (
        <FormDialog
          open={dialogForm.open}
          data={dialogForm.data ? dialogForm.data : ({} as IData)}
          onHandleDialogForm={setDialogForm}
        />
      )}
      <StyledTableCell component='th' scope='row'>
        {index + 1}
      </StyledTableCell>
      <StyledTableCell component='th' scope='row'>
        <Customer customer={data} />
      </StyledTableCell>
      <StyledTableCell align='left'>{data.location}</StyledTableCell>
      <StyledTableCell align='left'>{data.fat}</StyledTableCell>
      <StyledTableCell align='left'>
        <Status status={data.status} />
      </StyledTableCell>
      <StyledTableCell align='left'>{data.netAmount}</StyledTableCell>
      <StyledTableCell align='left'>
        <ActionButton onHandleOpenDialog={handleClickOpenDialog} />
      </StyledTableCell>
    </>
  );
});

ItemOrder.displayName = 'ItemOrder';
