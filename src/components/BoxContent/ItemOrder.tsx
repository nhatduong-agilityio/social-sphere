import {
  IconButton,
  styled,
  TableCell,
  tableCellClasses,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import { FunctionComponent, memo } from 'react';
import { IData } from '~/types/data';
import { Customer } from './Customer';
import { Status } from './Status';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(() => ({
  fontSize: '13px',
}));

interface IProps {
  index: number;
  data: IData;
  onOpenDialog: (data: IData) => void;
}

export const ItemOrder: FunctionComponent<IProps> = memo(
  ({ index, data, onOpenDialog }: IProps) => {
    const handleClick = () => {
      onOpenDialog(data);
    };

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
          <StyledTooltip
            title='Action Details'
            placement='top'
            arrow
            sx={{
              fontSize: '13px',
            }}
          >
            <IconButton
              onClick={handleClick}
              aria-label='action'
              size='large'
              color='secondary'
              sx={{
                width: '30px',
                height: '30px',
                border: '2px solid',
                borderRadius: '30px',
                textAlign: 'center',
              }}
            >
              <ArrowForwardIcon fontSize='large' />
            </IconButton>
          </StyledTooltip>
        </StyledTableCell>
      </>
    );
  },
);

ItemOrder.displayName = 'ItemOrder';
