import React from "react";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import "assets/vendors/style";
import configureStore, { history } from "./appRedux/store";
import App from "./containers/App/index";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const store = configureStore(/* provide initial state if any */);

export const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    query: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
    mutate: {
      fetchPolicy: "no-cache",
      errorPolicy: "all",
    },
  },
});

const NextApp = () => (
  <ApolloProvider client={client}>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" component={App} />
        </Switch>
      </ConnectedRouter>
    </Provider>
  </ApolloProvider>
);

export default NextApp;
