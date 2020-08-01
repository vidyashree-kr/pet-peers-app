import React, { Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
const MyCart = React.lazy(() => import('./application/shoppingCart/MyCart'))
const Login = React.lazy(() => import('./application/login/Login'))
const Dashboard = React.lazy(() => import('./application/dashBoard/Dashboard'))
const MyOrders = React.lazy(() => import('./application/myOrders/MyOrders'))

export default function App(props) {
  return (
    <ApolloProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <Router>
          <div>
            <Switch>
              <Route path="/dashboard">
                <Dashboard />
              </Route>
              <Route path="/myOrders">
                <MyOrders />
              </Route>
              <Route path="/myCart">
                <MyCart />
              </Route>
              <Route path="/">
                <Login />
              </Route>
            </Switch>
          </div>
          <Route exact path="/login">
            <Login />
          </Route>
        </Router>
      </Suspense>
    </ApolloProvider>
  );
}

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://my-json-server.typicode.com/vidyashree-kr/json-server/' }),
  cache: new InMemoryCache().restore({}),
});
