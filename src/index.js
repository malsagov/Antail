import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom'

import App from './App'
import './index.sass'
import store from './redux/srote'
//rafce

const client = new ApolloClient({
  uri: 'https://graphql.anilist.co',
  cache: new InMemoryCache({
    typePolicies: {
      Page: {
        fields: {
          media: {
            merge(existiong = [], incoming){
              return incoming
            } 
          }
        }
      }
    }
  })
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </ApolloProvider>,
  document.getElementById('root')
);
