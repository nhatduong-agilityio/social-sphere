// Libs
import { Button } from '@mui/material';
import { FunctionComponent, memo } from 'react';
import SyncIcon from '@mui/icons-material/Sync';

interface IProps {
  onHandleRefresh: () => void;
}

export const ButtonRefresh: FunctionComponent<IProps> = memo(({ onHandleRefresh }: IProps) => {
  return (
    <Button
      variant='contained'
      color='secondary'
      startIcon={
        <SyncIcon
          sx={{
            transform: 'scaleX(-1)',
          }}
        />
      }
      sx={{
        textTransform: 'capitalize',
        fontSize: '16px',
        backgroundColor: '#03A9F4',
      }}
      onClick={onHandleRefresh}
    >
      refresh list
    </Button>
  );
});

ButtonRefresh.displayName = 'ButtonRefresh';
