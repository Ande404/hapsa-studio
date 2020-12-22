import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 2rem;

  ${up('md')} {
  }
  max-width: 960px;
  margin: 0 auto;
  font-family: 'Inter';
`;

// sm: '576px',
// md: '768px',
// lg: '992px',
// xl: '1200px',
