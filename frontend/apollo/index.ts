import { ApolloClient, HttpLink } from "@apollo/client/core";
import { InMemoryCache } from "@apollo/client/cache";
import { AuthStore } from "../stores/Store";
const httpLink = new HttpLink({
  uri: import.meta.env.VITE_APOLLO as string,
  headers:{
    sessionId: AuthStore.getState().sessionId,
  }
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    typePolicies:{
       Query:{
         fields:{
          users:{
            merge(existing, incoming, { mergeObjects }) {
              return mergeObjects(existing,incoming);
            },
          },
          count:{
            merge(existing, incoming) {
              return incoming;
            },
          }
         }
       },
    }
  }),
  
});
