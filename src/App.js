import React from 'react'
import { useLocation} from 'react-router-dom'
import Routes from './routes';
import {ApolloClient, ApolloProvider, InMemoryCache, gql} from '@apollo/client'

import {parse} from 'query-string'

import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import {getCurrentUser} from './redux/currentUserReduser'

const App = () => {
    const client = new ApolloClient({
        uri: 'https://graphql.anilist.co',
        cache: new InMemoryCache()
    })

    const location = useLocation()
    const dispatch = useDispatch()
    const accessToken = parse(location.hash)
    if (accessToken.access_token) {
      localStorage.setItem('access_token', accessToken.access_token)
      window.location.hash = ''
    }
    
    React.useEffect(() => {
        if(!localStorage.getItem('access_token')) {
          return
        }
        dispatch(getCurrentUser())
    }, [])

    return (
        <ApolloProvider client={client}>
            <Header />
            <Routes />
        </ApolloProvider>
    );
}

export default App
