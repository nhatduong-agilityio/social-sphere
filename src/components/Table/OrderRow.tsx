// Libs
import {
  IconButton,
  styled,
  TableCell,
  tableCellClasses,
  TableRow,
  Tooltip,
  TooltipProps,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { FunctionComponent, memo } from 'react';

// Components
import { User } from '~/components/Table/User';
import { Status } from '~/components/Table/Status';
import { IUser } from '~/types/user';

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  ':hover': {
    backgroundColor: theme.palette.action.hover,
  },
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
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
  item: IUser;
  onOpenDialog: (id: number) => void;
}

export const OrderRow: FunctionComponent<IProps> = memo(({ index, item, onOpenDialog }: IProps) => {
  const handleClick = () => {
    onOpenDialog(item.id);
  };

  return (
    <>
      <StyledTableRow>
        <StyledTableCell component='th' scope='row'>
          {index + 1}
        </StyledTableCell>
        <StyledTableCell component='th' scope='row'>
          <User avatar={item.avatar} name={item.name} />
        </StyledTableCell>
        <StyledTableCell align='left'>{item.location}</StyledTableCell>
        <StyledTableCell align='left'>{item.orderDate}</StyledTableCell>
        <StyledTableCell align='left'>
          <Status status={item.status} />
        </StyledTableCell>
        <StyledTableCell align='left'>{`$ ${item.netAmount}`}</StyledTableCell>
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
      </StyledTableRow>
    </>
  );
});

OrderRow.displayName = 'OrderRow';
