import React from 'react'
import { useLocation} from 'react-router-dom'
import Routes from './routes';

import {parse} from 'query-string'

import Header from './components/header/Header';
import { useDispatch } from 'react-redux';
import {getCurrentUser} from './redux/currentUserReduser'

const App = () => {
    
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
    }, [dispatch])

    return (
        <div>
            <Header />
            <Routes />
        </div>
    );
}

export default App
