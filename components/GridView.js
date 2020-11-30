import { useQuery } from 'react-query';
import { gql } from 'graphql-request';
import { request } from '../lib/hasuraClient';
import { Wrapper } from './atoms/Wrapper';
import styled from 'styled-components';
const USER_PROFILE = gql`
  query singleProfile {
    profile {
      id
      email
      last_name
      first_name
      title
      website
    }
  }
`;

const getProfile = async () => {
  const data = await request(USER_PROFILE);
  return data;
};

const GridView = () => {
  const { status, data, error } = useQuery('profile', getProfile);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'error') return <div>Error: {error.message}(</div>;
  return (
    <Wrapper>
      <Grid>
        {data.profile.map((user) => (
          <ProfileCard key={user.id}>
            <h3>
              {user['first_name']} {user['last_name']}
            </h3>
            <p>{user.title}</p>
            <p>{user.email}</p>
            <p>{user.website}</p>
          </ProfileCard>
        ))}
      </Grid>
    </Wrapper>
  );
};

const Grid = styled.div`
  padding: 6rem 0;
  display: grid;
  row-gap: 2rem;
  column-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  ${'up'} {
    color: red;
  }
`;

const ProfileCard = styled.div`
  display: grid;
  row-gap: 0.5rem;
`;

export default GridView;
