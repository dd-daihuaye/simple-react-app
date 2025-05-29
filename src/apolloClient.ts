import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import RateLimitLink from './RateLimitLink';

const httpLink = new HttpLink({ uri: 'https://countries.trevorblades.com/' });

// Allow one request per second
const rateLimitLink = new RateLimitLink(1, 1000);

const client = new ApolloClient({
  link: rateLimitLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
