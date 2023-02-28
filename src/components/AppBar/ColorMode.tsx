import { Box, IconButton, Typography, useTheme } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { memo, useContext } from 'react';
import { ColorModeContext } from '~/store/providers/colorMode';

const IconModeRenderer = ({ theme }: { theme: 'dark' | 'light' }) => {
  const IconComponent = theme === 'dark' ? Brightness4 : Brightness7;

  return <IconComponent sx={{ fontSize: '24px' }} />;
};

export const ColorMode = memo(() => {
  const theme = useTheme();
  const { setMode, mode } = useContext(ColorModeContext);

  const handleSetMode = (_event: React.MouseEvent<HTMLButtonElement>) => {
    setMode(mode);
  };

  return (
    <>
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
    </>
  );
});

ColorMode.displayName = 'ColorMode';
