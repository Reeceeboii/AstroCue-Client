import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/Theme/Theme';
import { AstroCueUserContextProvider } from '../src/Context/AstroCueUser/AstroCueUserContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AstroCueUserContextProvider>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AstroCueUserContextProvider>
  );
}

export default MyApp;
