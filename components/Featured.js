import styled from 'styled-components';
import { Wrapper } from './atoms/Wrapper';
import { up } from 'styled-breakpoints';
import { useAuth } from '../lib/auth';

const Featured = () => {
  const auth = useAuth();

  return (
    <Wrapper>
      {/* {auth.user ? (
        <div>
          <p>Email: {auth.user.email}</p>
        </div>
      ) : (
        <p>Not signed in</p>
      )} */}
      {/* <Grid>
        <Card>
          <p className='num'>Free</p>

          <h2 className='title'>Youtube Pack for Developers</h2>
          <p className='body'>
            High quality After Effects and Premeire Pro Compatible Motion
            Graphics. Easily overide all settings and customize to your liking.
          </p>
          <StyledButton>Download Item</StyledButton>
        </Card>
      </Grid> */}
    </Wrapper>
  );
};

const Grid = styled.div`
  margin: 5rem 0;
  background: linear-gradient(
    318deg,
    rgba(224, 251, 180, 0.7469362745098039) 0%,
    rgba(196, 251, 109, 1) 100%
  );

  padding: 3rem;
  display: grid;
  grid-template-columns: 1fr;
  border-top: 6px solid black;

  ${up('sm')} {
    height: 420px;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 6rem;
  }
`;

const Card = styled.div`
  width: 100%;

  .title {
    margin-top: 1rem;
    font-weight: 600;
    font-size: 1.6rem;
    letter-spacing: -2px;
    line-height: 1.2;
    ${up('sm')} {
      font-size: 2.8rem;
    }
  }

  .num {
    font-size: 1rem;
    font-style: italic;
    font-weight: 400;
  }

  .body {
    width: 85%;
    font-size: 1.1rem;
    letter-spacing: -0.3px;
    padding-top: 2rem;
    line-height: 1.2;
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
  margin-top: 3rem;
  /* :hover {
    background-color: ${({ theme }) => theme.colors.neon};
    color: ${({ theme }) => theme.colors.dark};
  } */
`;

export default Featured;
