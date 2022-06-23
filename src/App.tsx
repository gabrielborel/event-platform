import { Router } from './Router';
import { ApolloProvider } from '@apollo/client';
import { client } from './lib/apollo';

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Router />
    </ApolloProvider>
  );
}
