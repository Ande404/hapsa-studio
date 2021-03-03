import { GraphQLClient } from 'graphql-request';

// query here can also be a mutation
export async function request(source, url, query, variables = {}) {
  const client = new GraphQLClient(url, {
    headers: {
      Authorization: `bearer ${process.env.NEXT_PUBLIC_DATO_ACCESS}`,
      'Content-Type': 'application/json',
    },
  });

  const data = await client.request(query, variables);
  return data;
}
