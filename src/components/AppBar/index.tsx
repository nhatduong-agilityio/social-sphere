// Libs
import { Box, AppBar, Toolbar, Typography, Button, useTheme, IconButton } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { FunctionComponent, memo, useContext } from 'react';
import { Brightness4, Brightness7 } from '@mui/icons-material';

// Store
import { ColorModeContext } from '~/store/providers/toggleColorMode';

interface IProps {
  onHandleRefresh: () => void;
}

const IconModeRenderer = ({ theme }: { theme: 'dark' | 'light' }) => {
  const IconComponent = theme === 'dark' ? Brightness4 : Brightness7;

  return <IconComponent sx={{ fontSize: '24px' }} />;
};

export const AppBarContent: FunctionComponent<IProps> = memo(({ onHandleRefresh }: IProps) => {
  const theme = useTheme();
  const { setMode, mode } = useContext(ColorModeContext);

  const handleSetMode = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setMode(mode);
  };

  return (
    <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
      <AppBar
        position='static'
        color='secondary'
        sx={{
          borderRadius: '3px 3px 0 0',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Typography component='h1' sx={{ flexGrow: 1, fontSize: '24px' }}>
            Order <b>Details</b>
          </Typography>
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
          <Typography
            sx={{ fontSize: '16px', textTransform: 'capitalize', paddingLeft: '30px' }}
            color={theme.palette.secondary.contrastText}
          >
            {mode} mode
          </Typography>
          <Box
            sx={{
              textTransform: 'capitalize',
            }}
          >
            <IconButton sx={{ paddingLeft: 1 }} onClick={handleSetMode} color='inherit'>
              <IconModeRenderer theme={theme.palette.mode} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

AppBarContent.displayName = 'AppBarContent';
