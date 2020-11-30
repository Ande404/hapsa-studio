import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
import Logo from './atoms/Logo';
import { up } from 'styled-breakpoints';
import { useAuth } from '../lib/auth';

const Nav = () => {
  const auth = useAuth();

  return (
    <Wrapper>
      <StyledNav>
        <TextLogo>
          Hapsa
          <br />
          Studio.
        </TextLogo>
        <LinkWrapper>
          <a>Work</a>
          <a>Blog</a>
          <a>About</a>
          {auth.user ? (
            <div>
              <StyledButton onClick={(e) => auth.signout()}>
                Sign Out
              </StyledButton>
            </div>
          ) : (
            <StyledButton onClick={(e) => auth.signinWithGoogle()}>
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

const TextLogo = styled.p`
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.2;
  font-family: 'IBM Plex Sans';
`;

const StyledLink = styled.a`
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: -0.3px;
  text-decoration: none;
  margin-left: 1rem;
`;

const LinkWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  a {
    margin-left: 1rem;

    :first-child {
      margin-left: 0rem;
    }
  }
  margin-top: 1rem;
  ${up('sm')} {
    margin-top: 0rem;
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.dark};
  border: none;
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ease-in 0.18s;
  text-decoration: none;

  margin-left: 1rem;

  :hover {
    background-color: ${({ theme }) => theme.colors.neon};
    color: ${({ theme }) => theme.colors.dark};
  }
  margin-top: 1rem;
  ${up('sm')} {
    margin-top: 0rem;
  }
`;

export default Nav;
