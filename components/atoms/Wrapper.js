import { down, up } from 'styled-breakpoints';
import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 0 1rem;

  ${up('sm')} {
    padding: 0 3rem;
  }

  ${down('md')} {
    padding: 0 2rem;
  }

  ${up('md')} {
    padding: 0 6rem;
  }

  max-width: 1200px;
  margin: 0 auto;
`;
