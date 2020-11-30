import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { useAuth } from '../lib/auth';
import Link from 'next/link';

const Nav = () => {
  const auth = useAuth();

  return (
    <Wrapper>
      <StyledNav>
        <Link href='/'>
          <TextLogo>Hapsa.</TextLogo>
        </Link>

        <LinkWrapper>
          <Link href='/'>
            <StyledLink>Work</StyledLink>
          </Link>
          <Link href='/'>
            <StyledLink>Blog</StyledLink>
          </Link>
          <Link href='/store'>
            <StyledLink>Store</StyledLink>
          </Link>

          <Link href='/'>
            <StyledLink>About</StyledLink>
          </Link>

          {auth.user ? (
            <div>
              <StyledButton onClick={() => auth.signout()}>
                Sign Out
              </StyledButton>
            </div>
          ) : (
            <StyledButton onClick={() => auth.signinWithGoogle()}>
              Sign In
            </StyledButton>
          )}
        </LinkWrapper>
      </StyledNav>
    </Wrapper>
  );
};

const StyledNav = styled.div`
  padding: 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: left;
  ${up('sm')} {
    flex-direction: row;
    align-items: center;
  }
`;

const TextLogo = styled.a`
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  cursor: pointer;
`;

const StyledLink = styled.a`
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: -0.3px;
  text-decoration: none;
  margin-left: 1rem;
  color: black;
  cursor: pointer;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 1rem;
  a {
    margin-left: 1rem;

    :first-child {
      margin-left: 0rem;
    }
  }

  ${up('sm')} {
    margin-top: 0rem;
  }
`;

const StyledButton = styled.button`
  border: 1px solid grey;
  background-color: transparent;
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ease-in 0.18s;
  text-decoration: none;

  margin-left: 1rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.dark};

    color: ${({ theme }) => theme.colors.white};
  }

  ${up('sm')} {
    margin-top: 0rem;
  }
`;

export default Nav;
