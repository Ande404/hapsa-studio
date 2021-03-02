import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { AuthProvider } from '../context/auth';
import { styledTheme } from '../theme/theme';
import { Reset } from 'styled-reset';

import { ChakraProvider, CSSReset, extendTheme } from '@chakra-ui/react';
import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/global.js';
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

  const theme = extendTheme({
    colors,
    fonts: {
      heading: 'Manrope',
      body: 'Manrope',
    },
  });
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <AuthProvider>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <ReactQueryDevtools initialIsOpen={false} />
          <GlobalStyle />
          <ThemeProvider theme={styledTheme}>
            <Component {...pageProps} />
          </ThemeProvider>
        </ReactQueryCacheProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}

// logs app metrics, useful later
// export function reportWebVitals(metric) {
//   console.log(metric);
// }
