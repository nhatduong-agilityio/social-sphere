import { styled, TableCell, tableCellClasses } from '@mui/material';
import { FunctionComponent, memo, useCallback, useState } from 'react';
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
  onClickOpenDialog: (data: IData) => void;
}

export const ItemOrder: FunctionComponent<IProps> = memo(
  ({ index, data, onClickOpenDialog }: IProps) => {
    const handleClickOpenDialog = useCallback(() => {
      onClickOpenDialog(data);
    }, [data, onClickOpenDialog]);

    return (
      <>
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
          <ActionButton onClickOpenDialog={handleClickOpenDialog} />
        </StyledTableCell>
      </>
    );
  },
);

ItemOrder.displayName = 'ItemOrder';
