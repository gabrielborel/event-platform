import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://api-sa-east-1.graphcms.com/v2/cl4o62udt0qbv01xig0b27wex/master',
  cache: new InMemoryCache(),
});
