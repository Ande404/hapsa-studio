import React from 'react';
import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
const BlogGrid = () => {
  return (
    <Wrapper>
      <TextBlock>
        <Title>
          Our teams also write about <em>the</em> process
        </Title>
      </TextBlock>
    </Wrapper>
  );
};

const TextBlock = styled.div`
  margin-top: 3rem;
`;
const Title = styled.h2`
  font-size: 2rem;
  font-weight: 500;
`;
export default BlogGrid;
