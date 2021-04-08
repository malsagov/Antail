import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Main from './pages/main/Main'
import Test from './components/test/Test'
import Anime from './pages/anime/Anime'
import User from './pages/user/User'

export default () => {
    return (
        <Switch>
            <Route exact path='/' component={Main} />
            <Route path='/test' component={Test} />
            <Route path='/search/anime' component={Anime} />
            <Route exact path='/user/:slug' component={User} />
            <Route path='/user/:slug/animelist' component={User} />
            <Route path='/user/:slug/mangalist' component={User} />
            <Route path='/user/:slug/favorites' component={User} />
            <Route path='/user/:slug/stats' component={User} />
            <Route path='/user/:slug/social' component={User} />
        </Switch>
    )
}