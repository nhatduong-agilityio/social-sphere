import { IconButton, styled, Tooltip, TooltipProps } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { IData } from '~/types/data';

const ToBeStyledTooltip = ({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ tooltip: className }} />
);
const StyledTooltip = styled(ToBeStyledTooltip)(() => ({
  fontSize: '13px',
}));

interface IProps {
  onClickOpenDialog: () => void;
}

export const ActionButton = ({ onClickOpenDialog }: IProps) => {
  const click = () => {
    onClickOpenDialog();
  };

  return (
    <StyledTooltip
      title='Action Details'
      placement='top'
      arrow
      sx={{
        fontSize: '13px',
      }}
    >
      <IconButton
        onClick={click}
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
  );
};
