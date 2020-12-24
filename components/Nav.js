import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import Link from 'next/link';
const Nav = () => {
  return (
    <StyledNav>
      <Link href='/'>
        <TextLogo>Hapsa</TextLogo>
      </Link>
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  display: flex;
  padding: 2rem;
  justify-content: space-between;
  align-items: center;
`;
const TextLogo = styled.p`
  color: #000;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 600;
  font-family: 'Manrope';
  line-height: 1.2;
  letter-spacing: -1.2px;
  cursor: pointer;
`;

export default Nav;
