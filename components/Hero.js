import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Wrapper } from './atoms/Wrapper';

const Hero = () => {
  return (
    <Wrapper>
      <Flex>
        <Title>
          A tiny studio dedicated to creating wonderful things for the web
        </Title>
      </Flex>
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  ${up('sm')} {
    width: 65%;
    padding: 3rem 0;
  }
  flex-direction: row;
  justify-content: center;
`;

const Title = styled.p`
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
`;

export default Hero;
