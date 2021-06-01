import React from 'react'
import s from './User.module.sass'
import { NavLink } from 'react-router-dom'
import { useQuery } from '@apollo/client'

import { GET_USER } from '../../graphql/queries/getUser'
import Overview from './overview/Overview'

const User = ({match, location}) => {
    const userName = match.params.slug
    const { loading: userLoading, error: userError, data: {User: user = {}} = {}} = useQuery( GET_USER, {
        variables: { 
            name: userName
        }
    })

    
    React.useEffect(() => {
        // dispatch(getUser(userName))
    }, [userName])
        
        
        if (userLoading) return null
        if (userError) return <div>Some error happend...</div>
        
        console.log(user)
    const isPath = (path) => {
        if (location.pathname.includes(path)) {
            return true
        } 
        return false
    }

    return (
        <div className={s.User}>
            
            <div className={s.banner} style={{backgroundImage: user.bannerImage ? `url(${user.bannerImage})` : null}}>
                <div className={s.shadow}></div>
                <div className={`container ${s.userContainer}`}>
                    <div className={s.bannerContainer}>
                        <div className={s.userBlock}>
                            <img className={s.avatar} src={user.avatar &&(user.avatar.large)}  alt=""/>
                            <h2 className={s.name}>{user.name}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className={s.nav}>
                <ul className={s.navList}>
                    <li className={s.navItem}>
                        <NavLink exact activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}`}>Overview</NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}/animelist`}>Anime List</NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}/mangalist`}>Manga List</NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}/favorites`}>Favorites</NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}/stats`}>Stats</NavLink>
                    </li>
                    <li className={s.navItem}>
                        <NavLink activeClassName={s.activeNavLink} className={s.navLink} to={`/user/${userName}/social`}>Social</NavLink>
                    </li>
                </ul>
            </div>
            {
               location.pathname === `/user/${userName}` && (
                <div>
                    1
                    {/* <Overview about={user.about}/> */}
                </div>
               )
            }
            {
               isPath('animelist') && (
                <div>
                    2
                </div>
               )
            }
            {
               isPath('mangalist') && (
                <div>
                    3
                </div>
               )
            }
            {
               isPath('favorites') && (
                <div>
                    4
                </div>
               )
            }
            {
               isPath('stats') && (
                <div>
                    5
                </div>
               )
            }
            {
               isPath('social') && (
                <div>
                    6
                </div>
               )
            }
        </div>
    )
}

export default User
