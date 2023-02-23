import { Button, IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useState } from 'react';
import SyncIcon from '@mui/icons-material/Sync';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

export default {
  title: 'Button',
  component: Button,
};

export const ToggleMode = () => {
  const [change, setChange] = useState(true);

  const IconModeRenderer = ({ change }: { change: boolean }) => {
    const IconComponent = change ? Brightness4 : Brightness7;

    return <IconComponent sx={{ fontSize: '24px' }} />;
  };

  const handleSetMode = () => {
    setChange(!change);
  };

  return (
    <IconButton sx={{ paddingLeft: 1 }} onClick={handleSetMode} color='inherit'>
      <IconModeRenderer change={change} />
    </IconButton>
  );
};

export const Action = () => {
  const handleClick = () => {
    alert('Open dialog');
  };

  return (
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
  );
};

const onHandleRefresh = () => {
  alert('Refresh list');
};

export const Default = () => <Button variant='outlined'>Default</Button>,
  Primary = () => (
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
  ),
  Secondary = () => <Button color='secondary'>Secondary</Button>,
  Warning = () => (
    <Button color='warning' variant='outlined'>
      Cancel
    </Button>
  ),
  Error = () => (
    <Button color='error' variant='outlined'>
      Delete
    </Button>
  ),
  Info = () => (
    <Button color='info' type='submit' variant='outlined'>
      Update
    </Button>
  );
