import { Box, AppBar, Toolbar, Typography, Button, useTheme, IconButton } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { FunctionComponent, memo, useContext } from 'react';
import { ColorModeContext } from '~/store/providers/toggleColorMode';
import { Brightness4, Brightness7 } from '@mui/icons-material';

interface IProps {
  onHandleRefresh: () => void;
}

export const AppBarContent: FunctionComponent<IProps> = memo(({ onHandleRefresh }: IProps) => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box sx={{ flexGrow: 1, marginTop: '30px' }}>
      <AppBar
        position='static'
        color='secondary'
        sx={{
          borderRadius: '3px 3px 0 0',
          backgroundColor: `${theme.palette.primary.main}`,
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
            color={`${theme.palette.secondary.contrastText}`}
          >
            {theme.palette.mode} mode
          </Typography>
          <Box
            sx={{
              textTransform: 'capitalize',
            }}
          >
            <IconButton sx={{ paddingLeft: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? (
                <Brightness4 sx={{ fontSize: '24px' }} />
              ) : (
                <Brightness7 sx={{ fontSize: '24px' }} />
              )}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
});

AppBarContent.displayName = 'AppBarContent';
