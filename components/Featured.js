import styled from 'styled-components';
import { Wrapper } from './atoms/Wrapper';
import { up } from 'styled-breakpoints';
import Image from 'next/image';

const Featured = () => {
  return (
    <div>
      <Grid>
        <Wrapper>
          <Flex>
            <h2 className='title'>Youtube Pack for Developers</h2>
          </Flex>
        </Wrapper>
      </Grid>
    </div>
  );
};

const Grid = styled.div`
  margin: 5rem 0;
  background: #000;
  color: white;
`;

const Flex = styled.div`
  display: grid;
  padding: 6rem 0;
  grid-template-columns: 1fr;
  row-gap: 6rem;

  ${up('lg')} {
    grid-template-columns: 1fr 1fr;
  }
`;
const Card = styled.div`
  width: 100%;

  ${up('lg')} {
    width: 420px;
  }
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

  .body {
    width: 85%;
    font-size: 1.1rem;
    letter-spacing: -0.3px;
    padding-top: 2rem;
    line-height: 1.2;
  }
`;

const StyledButton = styled.button`
  background-color: ${({ theme }) => theme.colors.white};
  border: none;
  padding: 14px 16px;
  color: ${({ theme }) => theme.colors.dark};
  font-weight: 600;
  border-radius: 5px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all ease-in 0.18s;
  text-decoration: none;
  margin-top: 3rem;
`;

export default Featured;
