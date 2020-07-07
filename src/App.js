import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Login from './Application/Login'
import Dashboard from './Application/Dashboard'
import Cart from './Application/Cart'
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import { ApolloProvider} from 'react-apollo';

export default function App(props){
    return (
      <ApolloProvider client={client}>
        <Router>
      <div>
        <Switch>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route path="/">
            <Login />
          </Route>
           </Switch>
      </div>
      <Route exact path="/Login">
            <Login />
          </Route>
    </Router>
      </ApolloProvider>
    );
  }
  
  const client = new ApolloClient({
     link: new HttpLink({ uri: 'https://my-json-server.typicode.com/vidyashree-kr/json-server/' }),
    cache: new InMemoryCache().restore({}),
  });
