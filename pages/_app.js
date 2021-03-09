import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../context/auth';
import { customTheme } from '../theme/theme';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}
