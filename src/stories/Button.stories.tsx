import { Button, IconButton, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { useContext } from 'react';
import { ColorModeContext } from '~/store/providers/toggleColorMode';

export default {
  title: 'Button',
  component: Button,
};

export const ButtonIcon = () => {
  const theme = useTheme();
  const { setMode, mode } = useContext(ColorModeContext);

  const handleSetMode = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setMode(mode);
  };

  const IconModeRenderer = ({ theme }: { theme: 'dark' | 'light' }) => {
    const IconComponent = theme === 'dark' ? Brightness4 : Brightness7;

    return <IconComponent sx={{ fontSize: '24px' }} />;
  };

  return (
    <IconButton sx={{ paddingLeft: 1 }} onClick={handleSetMode} color='inherit'>
      <IconModeRenderer theme={theme.palette.mode} />
    </IconButton>
  );
};

export const Default = () => <Button variant='outlined'>Default</Button>,
  Primary = () => <Button>Primary</Button>,
  Secondary = () => <Button color='secondary'>Secondary</Button>;
