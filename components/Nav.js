import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { useAuth } from '../lib/auth';
import Link from 'next/link';
const Nav = () => {
  const auth = useAuth();
  return (
    <div>
      <StyledNav>
        <Link href='/'>
          <TextLogo>Hapsa</TextLogo>
        </Link>
        {auth.user ? (
          <div>
            <p>{auth.user.email}</p>
            <button onClick={(e) => auth.signout()}>Sign out</button>
          </div>
        ) : (
          <div>
            <button onClick={(e) => auth.signinWithGoogle()}>Sign In</button>
          </div>
        )}
      </StyledNav>
    </div>
  );
};

const StyledNav = styled.div`
  background-color: orange;
  padding: 1rem 2rem;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom: 3px solid ${up('sm')} {
    flex-direction: row;
    align-items: center;
  }
`;

const TextLogo = styled.p`
  color: #000;
  text-decoration: none;
  font-size: 1.2rem;
  font-weight: 800;
  font-family: 'Manrope';
  line-height: 1.2;
  letter-spacing: -1.2px;
  cursor: pointer;
`;

const StyledButton = styled.button`
  padding: 12px 22px;
  border: none;
  background-color: ${({ theme }) => theme.colors.neon};
  font-weight: 600;
  cursor: pointer;
`;

export default Nav;
