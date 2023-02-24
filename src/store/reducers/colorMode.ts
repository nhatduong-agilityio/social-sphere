// Libs
import { PaletteMode } from '@mui/material';

// Function handle customize color mode
export const settingMode = (mode: PaletteMode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          primary: {
            light: '#566787',
            main: '#4b5366',
            dark: '#495057',
            contrastText: '#999999',
          },
          secondary: {
            light: '#007bff',
            main: '#03A9F4',
            dark: '#212529',
            contrastText: '#ffffff',
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
            secondary: '#495057',
          },
          action: {
            hover: '#f5f5f5',
            selected: '',
            disabled: '',
            disabledBackground: '',
            focus: '',
          },
          background: {
            default: '#ffffff',
            paper: '#f5f5f5',
          },
        }
      : {
          primary: {
            light: '#ffffff',
            main: '#4b5366',
            dark: '#495057',
            contrastText: '#999999',
          },
          secondary: {
            light: '#007bff',
            main: '#03A9F4',
            dark: '#212529',
            contrastText: '#ffffff',
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
            primary: '#ffffff',
            secondary: '#495057',
          },
          action: {
            hover: '#000000',
            selected: '',
            disabled: '',
            disabledBackground: '',
            focus: '',
          },
          background: {
            default: '#212529',
            paper: '#000000',
          },
        }),
  },
  typography: {
    fontFamily: 'Varela+Round',
    fontWeightRegular: 400,
  },
});
