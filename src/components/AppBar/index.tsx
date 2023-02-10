import { Box, AppBar, Toolbar, Typography, Button, useTheme, IconButton } from '@mui/material';
import { useContext } from 'react';
import { ColorModeContext } from '~/store/providers/toggleColorMode';
import { Brightness7, Brightness4 } from '@mui/icons-material';

export const AppBarContent = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box>
      <AppBar position='static' color={'secondary'}>
        <Toolbar>
          <Typography>News</Typography>
          <Button color='inherit'>Login</Button>
          <Box
            sx={{
              textTransform: 'capitalize',
              color: theme.palette.primary.dark,
            }}
          >
            <Typography>{theme.palette.mode} mode</Typography>
            <IconButton sx={{ paddingLeft: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
              {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
