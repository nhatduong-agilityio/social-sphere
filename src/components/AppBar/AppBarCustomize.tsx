// Libs
import { Box, AppBar, Toolbar, useTheme } from '@mui/material';
import { FunctionComponent, memo } from 'react';

// Components
import { Brand } from '@components/AppBar/Brand';
import { ButtonRefresh } from '@components/AppBar/ButtonRefresh';
import { ColorMode } from '@components/AppBar/ColorMode';

interface IProps {
  onHandleRefresh: () => void;
}

export const AppBarCustomize: FunctionComponent<IProps> = memo(({ onHandleRefresh }: IProps) => {
  const theme = useTheme();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position='static'
        color='secondary'
        sx={{
          borderRadius: '3px 3px 0 0',
          backgroundColor: theme.palette.primary.main,
        }}
      >
        <Toolbar>
          <Brand />
          <ButtonRefresh onHandleRefresh={onHandleRefresh} />
          <ColorMode />
        </Toolbar>
      </AppBar>
    </Box>
  );
});

AppBarCustomize.displayName = 'AppBarCustomize';
