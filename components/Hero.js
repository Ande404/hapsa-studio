import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Wrapper } from './atoms/Wrapper';
import Image from 'next/image';

const Hero = () => {
  return (
    <Wrapper>
      <Flex>
        <h3 className='title'>
          A tiny studio dedicated to creating wonderful things for the web
        </h3>
      </Flex>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  /* background-color: ${({ theme }) => theme.colors.dark}; */

  ${up('sm')} {
    width: 65%;
    padding: 3rem 0;
  }
  flex-direction: row;
  justify-content: center;

  .title {
    font-size: 1.2rem;
    font-weight: 700;

    letter-spacing: -0.8px;
    line-height: 1.1;
    color: ${({ theme }) => theme.colors.dark};
    ${up('sm')} {
      letter-spacing: -2.5px;
      font-size: 2rem;
    }
    ${up('md')} {
      letter-spacing: -2.5px;
      font-size: 4rem;
    }
  }
`;

const Info = styled.p`
  padding-top: 1.5rem;
  font-size: 1.5rem;

  line-height: 1.2;
`;

export default Hero;
