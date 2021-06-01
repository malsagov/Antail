import React from 'react'
import {Route, Switch} from 'react-router-dom'

import Main from './pages/main/Main'
import Anime from './pages/anime/Anime'
import User from './pages/user/User'
import AnimeTrendPage from './pages/anime/animeTrendPage/AnimeTrendPage'
import AnimePage from './pages/animePage/AnimePage'

export default () => {
    return (
        <Switch>
            <Route exact path='/' component={Main} />
            <Route exact path='/search/anime' component={Anime} />
            <Route path='/search/anime/trending' component={AnimeTrendPage} />
            <Route path='/search/anime/this-season' component={AnimeTrendPage} />
            <Route path='/search/anime/next-season' component={AnimeTrendPage} />
            <Route path='/search/anime/popular' component={AnimeTrendPage} />
            <Route path='/search/anime/top-100' component={AnimeTrendPage} />
            <Route path='/anime/:slug' component={AnimePage} />
            <Route exact path='/user/:slug' component={User} />
            <Route path='/user/:slug/animelist' component={User} />
            <Route path='/user/:slug/mangalist' component={User} />
            <Route path='/user/:slug/favorites' component={User} />
            <Route path='/user/:slug/stats' component={User} />
            <Route path='/user/:slug/social' component={User} />
        </Switch>
    )
}