import React from 'react';
import { render } from '@testing-library/react';
import { ChakraProvider, CSSReset } from '@chakra-ui/react';
import { customTheme } from './theme/theme';
import { AuthProvider } from './context/auth';

// eslint-disable-next-line react/prop-types
const BigDawgProvider = ({ children }) => (
  <AuthProvider>
    <ChakraProvider theme={customTheme}>
      <CSSReset />
      {children}
    </ChakraProvider>
  </AuthProvider>
);

const customRender = (ui, options = {}) =>
  render(ui, { wrapper: BigDawgProvider, ...options });

export * from '@testing-library/react';

export { customRender as render };
