import styled from 'styled-components';
import { up } from 'styled-breakpoints';
import { Wrapper } from './atoms/Wrapper';
import { request } from '../lib/client';
import { gql } from 'graphql-request';
import { useQuery } from 'react-query';
import { AuthProvider } from '../context/auth';
import NextLink from 'next/link';

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
    <Content>
      <HeroText>
        <Title>Find the right talents for your next business venture</Title>
        <Secondary>
          Prove the ROI of social media, plan more engaging content, and create
          automated white label analytics reports.
        </Secondary>
        <StyledButton>Apply now</StyledButton>
      </HeroText>
    </Content>
  );
};

const Content = styled.section`
  width: 100%;
  padding: 8rem 1rem;
  box-sizing: border-box;
  display: flex;
  height: 100vh;
  background-color: #f4f6ff;
`;

const HeroText = styled.div`
  width: 100%;
  padding: 0;

  ${up('md')} {
    padding-left: 6rem;
    padding-top: 2rem;
    width: 640px;
  }
`;
const Title = styled.h1`
  font-size: ${({ theme }) => theme.spacing[8]};
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: -0.5px;
  color: ${({ theme }) => theme.colors.dark};

  ${up('md')} {
    letter-spacing: -1.8px;
    font-size: ${({ theme }) => theme.spacing[14]};
  }
`;

const Secondary = styled.p`
  font-weight: 400;
  line-height: 1.6;
  letter-spacing: -0.2px;
  color: ${({ theme }) => theme.colors.dark};
  font-size: ${({ theme }) => theme.spacing[4]};
  padding: 3rem 0;

  ${up('md')} {
    font-size: ${({ theme }) => theme.spacing[5]};
  }
`;

const StyledButton = styled.button`
  padding: 14px 26px;
  border: none;
  background-color: ${({ theme }) => theme.colors.dark};
  color: ${({ theme }) => theme.colors.white};
  font-weight: 500;
  font-size: 1rem;
  cursor: pointer;
`;

const Rect = styled.div`
  margin-left: 6rem;
  margin-top: 2rem;
  background-color: orange;
  width: 320px;
  height: 520px;
`;
export default Hero;
