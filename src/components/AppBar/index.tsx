import { Box, AppBar, Toolbar, Typography, Button, useTheme, IconButton } from '@mui/material';
import SyncIcon from '@mui/icons-material/Sync';
import { useContext } from 'react';
import { ColorModeContext } from '~/store/providers/toggleColorMode';
import { Brightness4, Brightness7 } from '@mui/icons-material';

export const AppBarContent = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const handleRefreshList = () => {
    console.log(123);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        color='secondary'
        sx={{
          borderRadius: 1,
        }}
      >
        <Toolbar>
          <Typography variant='h3' component='h1' sx={{ flexGrow: 1 }}>
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
              fontSize: 13,
            }}
            onClick={handleRefreshList}
          >
            refresh list
          </Button>
          <Typography>{theme.palette.mode} mode</Typography>
          <Box
            sx={{
              textTransform: 'capitalize',
            }}
          >
            <IconButton sx={{ paddingLeft: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
