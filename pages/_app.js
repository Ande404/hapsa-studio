import { ReactQueryCacheProvider, QueryCache } from 'react-query';
import { ReactQueryDevtools } from 'react-query-devtools';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../context/auth';
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
