import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './User.module.sass'

import { getUser } from '../../redux/userReducer'
import { NavLink } from 'react-router-dom'
import { gql, useQuery } from '@apollo/client'

const User = ({match, location}) => {
    const {user, isLoading} = useSelector(state => ({
        user: state.user.user,
        isLoading: state.user.isLoading
    }))
    const dispatch = useDispatch()
    
    const userName = match.params.slug

    const EXCHANGE_RATES = gql`
    query($name: String){
      User(name: $name) {
        id
        name
        bannerImage
      }
    }
    `
    const {loading, error, data} = useQuery(EXCHANGE_RATES, {
        variables: {
            name: userName
        }
    })
    console.log(data)
    
    React.useEffect(() => {
        dispatch(getUser(userName))
    }, [userName])

    const isPath = (path) => {
        if (location.pathname.includes(path)) {
            return true
        } 
        return false
    }

    if(isLoading){
        return <div>Loading...</div>
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
