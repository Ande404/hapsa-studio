import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
 html {
   font-family: ${({ theme }) => theme.fonts.main}
 }

`;

export default GlobalStyle;
