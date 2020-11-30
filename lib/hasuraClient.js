import { GraphQLClient } from 'graphql-request';

// arg query here can also be a mutation
export function request(query, variables = {}) {
  const client = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_ENPOINT, {
    headers: {
      'x-hasura-admin-secret': process.env.NEXT_PUBLIC_X_HASURA_ADMIN_SECRET,
      'Content-Type': 'application/json',
    },
  });

  return client.request(query, variables).then((data) => data);
}
