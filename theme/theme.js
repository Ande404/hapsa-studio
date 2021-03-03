import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: '#6b48ff',
    800: '#1ee3cf',
    700: '#010101',
    600: '#f2f4f6',
  },
};

const fonts = {
  heading: 'Space Grotesk',
  body: 'Space Grotesk',
};
export const customTheme = extendTheme({
  colors,
  fonts,
});
