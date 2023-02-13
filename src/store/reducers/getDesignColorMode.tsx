import { PaletteMode } from '@mui/material';

export const designColorMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: '#f5f5f5',
            main: '#e9e9e9',
            dark: '#dee2e6',
            contrastText: '#999',
          },
          secondary: {
            light: '#4b5366',
            main: '#333333',
            dark: '#212529',
          },
          error: {
            main: '#ff0000',
          },
          warning: {
            main: '#ffa500',
          },
          info: {
            main: '#1ca1c1',
          },
          success: {
            main: '#008000',
          },
          text: {
            primary: '#212529',
            secondary: '#FFFFFF',
          },
        }
      : {
          primary: {
            light: '#f5f5f5',
            main: '#e9e9e9',
            dark: '#dee2e6',
            contrastText: '#999',
          },
          secondary: {
            light: '#4b5366',
            main: '#666666',
            dark: '#212529',
          },
          error: {
            main: '#ff0000',
          },
          warning: {
            main: '#ffa500',
          },
          info: {
            main: '#1ca1c1',
          },
          success: {
            main: '#008000',
          },
          text: {
            primary: '#999776',
            secondary: '#FFFFFF',
          },
        }),
  },
  typography: {
    fontFamily: 'Varela+Round',
    fontWeightRegular: 400,
  },
});
