import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { AuthProvider } from '../../context/auth';
import { customTheme } from '../../theme/theme';
import '../../styles/styles.global.scss';

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ChakraProvider theme={customTheme}>
        <CSSReset />
        {/* eslint-disable-next-line react/jsx-props-no-spreading */}
        <Component {...pageProps} />
      </ChakraProvider>
    </AuthProvider>
  );
}
