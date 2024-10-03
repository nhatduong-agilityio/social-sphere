import { ReactNode } from 'react';
import type { Metadata } from 'next';

// Components
import { ThemeProvider } from '@/components/providers/theme-provider';
import { Toaster } from '@/components/providers/toaster';

// Styles
import { montserrat, roboto } from '../styles/fonts';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Next.js Boilerplate',
  description: 'Next.js 14+ boilerplate app',
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${roboto.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
