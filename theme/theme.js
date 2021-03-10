import { extendTheme } from '@chakra-ui/react';

const colors = {
  brand: {
    900: 'rgb(92,52,226)',
    800: 'rgb(216,236,241)',
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
