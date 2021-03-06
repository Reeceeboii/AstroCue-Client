import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@emotion/react';
import { theme } from '../src/Theme/Theme';
import { AstroCueUserContextProvider } from '../src/Context/AstroCueUserContext';
import { AstroCueObjectContextProvider } from '../src/Context/AstroCueObjectContext';
import '../src/lib/Axios';
import Layout from '../src/components/Layout/Layout';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AstroCueUserContextProvider>
      <AstroCueObjectContextProvider>
        <ThemeProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ThemeProvider>
      </AstroCueObjectContextProvider>
    </AstroCueUserContextProvider>
  );
}

export default MyApp;
