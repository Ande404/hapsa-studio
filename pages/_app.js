import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { AuthProvider } from '../context/auth';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { customTheme } from '../theme/theme';

const queryCache = new QueryCache();

export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      <AuthProvider>
        <ReactQueryCacheProvider queryCache={queryCache}>
          <ReactQueryDevtools initialIsOpen={false} />
          <Component {...pageProps} />
        </ReactQueryCacheProvider>
      </AuthProvider>
    </ChakraProvider>
  );
}
