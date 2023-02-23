// Libs
import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useMemo, useState } from 'react';

// Store
import { designColorMode } from '~/store/reducers/getDesignColorMode';

interface IProps {
  children: ReactNode;
}

interface IColorModeContext {
  setMode: Dispatch<SetStateAction<PaletteMode>>;
  mode: PaletteMode;
}

// Create context for color mode
export const ColorModeContext = createContext({} as IColorModeContext);

export const ColorModeProvider: FC<IProps> = ({ children }: IProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const handleSetMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(designColorMode(mode)), [mode]);

  const colorMode = {
    mode,
    setMode: handleSetMode,
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
