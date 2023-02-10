import { createTheme, PaletteMode, ThemeProvider } from '@mui/material';
import { createContext, FC, ReactNode, useMemo, useState } from 'react';
import { designColorMode } from '../reducers/getDesignColorMode';

interface IProps {
  children: ReactNode;
}

interface IColorModeContext {
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext({} as IColorModeContext);

export const ColorModeProvider: FC<IProps> = ({ children }: IProps) => {
  const [mode, setMode] = useState<PaletteMode>('light');

  const colorMode = useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  // Update the theme only if the mode changes
  const theme = useMemo(() => createTheme(designColorMode(mode)), [mode]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
