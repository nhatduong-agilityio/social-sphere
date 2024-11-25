import * as React from 'react';
import type { Preview } from '@storybook/react';
import { withThemeByClassName } from '@storybook/addon-themes';

// Components
import { ThemeProvider, Toaster } from '../src/components/providers';
import { montserrat, roboto } from '../src/styles/fonts';

import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

// Decoradores: https://storybook.js.org/docs/react/writing-stories/decorators#page-top
export const decorators = [
  (Story) => {
    return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div className={`${montserrat.variable} ${roboto.variable}`}>
          <Story />
          <Toaster />
        </div>
      </ThemeProvider>
    );
  },
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
];

export default preview;
