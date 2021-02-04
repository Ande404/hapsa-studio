import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/globalStyle';
import { theme } from '../theme/theme';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Reset } from 'styled-reset';
import { AuthProvider } from '../context/auth';

import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';

//unpkg.com/pdfjs-dist@2.5.207/build/pdf.worker.min.js

// 2. Extend the theme to include custom colors, fonts, etc
const queryCache = new QueryCache();
export default function App({ Component, pageProps }) {
  const colors = {
    brand: {
      900: '#6b48ff',
      800: '#1ee3cf',
      700: '#010101',
      600: '#f2f4f6',
    },
  };

  const theme = extendTheme({ colors });
  return (
    <AuthProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryDevtools initialIsOpen={false} />

        <ChakraProvider theme={theme}>
          {' '}
          <Component {...pageProps} />
        </ChakraProvider>
      </ReactQueryCacheProvider>
    </AuthProvider>
  );
}
