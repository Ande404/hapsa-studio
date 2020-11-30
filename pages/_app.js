import { ThemeProvider } from 'styled-components';
import GlobalStyle from '../theme/globalStyle';
import { theme } from '../theme/theme';
import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { Reset } from 'styled-reset';
import { AuthProvider } from '../lib/auth';
const queryCache = new QueryCache();

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ReactQueryCacheProvider queryCache={queryCache}>
        <ReactQueryDevtools initialIsOpen={true} />
        <ThemeProvider theme={theme}>
          <Reset />
          <GlobalStyle />
          <Component {...pageProps} />
        </ThemeProvider>
      </ReactQueryCacheProvider>
    </AuthProvider>
  );
}
