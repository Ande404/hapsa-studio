import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Wrapper } from './atoms/Wrapper';
import { request } from '../lib/client';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { useAuth } from '../lib/auth';
import Link from 'next/link';

// const GET_BLOG = gql`
//   query allBlog {
//     allBlogs(filter: {}) {
//       id
//       title
//       createdAt
//       excerpt(markdown: false)
//       slug
//       featuredImage {
//         alt
//         size
//       }
//     }
//   }
// `;

// const getBlog = async () => {
//   const result = await request(
//     'dato',
//     'https://graphql.datocms.com/',
//     GET_BLOG
//   );
//   return result;
// };

const Hero = () => {
  // const auth = useAuth();
  // const { status, data, error } = useQuery('blog', getBlog);

  // if (status === 'loading') return <div>Loading...</div>;
  // if (status === 'error') return <div>Error: {error.message}(</div>;

  // const { title, excerpt, slug } = data.allBlogs[0];

  return (
    <Wrapper>
      <Flex>
        <Content>
          <Title>Find the right talents for your next business venture</Title>
          <Secondary>
            We help creatives design and develop their creative business ideas
          </Secondary>

          <StyledButton>See more</StyledButton>
        </Content>
      </Flex>
    </Wrapper>
  );
};

const Flex = styled.div`
  padding: 3rem 3rem;
  display: grid;
  grid-template-columns: 1fr;
`;

const ImageWrapper = styled.div`
  width: 100%;
  img {
    width: 100%;
    height: 260px;
    object-fit: cover;
  }
  ${up('md')} {
    img {
      height: 360px;
    }
  }
`;

const Content = styled.div`
  max-width: 320px;

  text-align: center;
  margin: 0 auto;
  ${up('md')} {
    max-width: 620px;
  }
`;

const Title = styled.h1`
  font-size: 1.6rem;
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.4px;
  color: ${({ theme }) => theme.colors.dark};

  ${up('md')} {
    letter-spacing: -1.6px;
    font-size: 2.2rem;
  }
`;

const Secondary = styled.p`
  font-weight: 400;
  line-height: 1.1;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.spacing[4]};
  padding-top: 1rem;

  ${up('md')} {
    letter-spacing: -0.6px;
  }
`;

const StyledButton = styled.button`
  padding: 12px 22px;
  border: none;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 600;
  margin-top: 2rem;
  cursor: pointer;
`;

export default Hero;
