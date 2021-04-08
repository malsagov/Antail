import React from 'react'
import { Link, NavLink} from 'react-router-dom'
import s from './Header.module.sass'
import {stringify} from 'query-string'
import { useDispatch, useSelector } from 'react-redux'

const Header = () => {

    const queryString = stringify({
        client_id: '5219',
        response_type: 'token'
    })

    const {currentUser, isLoading, isAuthorized} = useSelector(state => ({
      currentUser: state.currentUser.currentUser,
      isLoading: state.currentUser.isLoading,
      isAuthorized: state.currentUser.isAuthorized
    }))
    const dispatch = useDispatch()

    const handleLogout = () => {
      localStorage.removeItem('access_token')
      dispatch({type: 'LOGOUT'})
      console.log(currentUser, isAuthorized)
    }

    if(isLoading){
      return <div>Loading...</div>
    }

    return (
      
      <div className={s.header}>
        <div className="container">
          <div className={s.headerBlock}>
            <Link className={s.logo} to="/">
              An<b className={s.logoAddition}>tail</b>
            </Link>
            <nav className={s.nav}>
              <ul className={s.navList}>
                <li className={s.navItem}>
                  <NavLink
                    className={s.navLink}
                    to="/search/anime"
                    activeClassName={s.activeLink}
                  >
                    Browse
                  </NavLink>
                </li>
                <li className={s.navItem}>
                  <NavLink
                    className={s.navLink}
                    to={`/user/${currentUser.name}`}
                    activeClassName={s.activeLink}
                  >
                    Profile
                  </NavLink>
                </li>
                <li className={s.navItem}>
                  <NavLink
                    className={s.navLink}
                    to="/forum"
                    activeClassName={s.activeLink}
                  >
                    Forum
                  </NavLink>
                </li>
              </ul>
            </nav>
            <div className={s.authBlock}>
                <svg
                  className={s.search}
                  width="20"
                  height="20"
                  x="0"
                  y="0"
                  viewBox="0 0 56.966 56.966"
                  style={{ enableBackground: "new 0 0 512 512" }}
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      xmlns="http://www.w3.org/2000/svg"
                      d="M55.146,51.887L41.588,37.786c3.486-4.144,5.396-9.358,5.396-14.786c0-12.682-10.318-23-23-23s-23,10.318-23,23  s10.318,23,23,23c4.761,0,9.298-1.436,13.177-4.162l13.661,14.208c0.571,0.593,1.339,0.92,2.162,0.92  c0.779,0,1.518-0.297,2.079-0.837C56.255,54.982,56.293,53.08,55.146,51.887z M23.984,6c9.374,0,17,7.626,17,17s-7.626,17-17,17  s-17-7.626-17-17S14.61,6,23.984,6z"
                      fill="#ffffff"
                    />
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                    <g xmlns="http://www.w3.org/2000/svg"></g>
                  </g>
                </svg>
              {isAuthorized ? (
                <div className={s.user}>
                  <div className={s.avatar} style={{background: `url(${currentUser.avatar.medium}) center no-repeat`, backgroundSize: 'cover', backgroundClip: 'padding-box'}}></div>
                  <p className={s.name}>{currentUser.name}</p>
                  <svg 
                    className={s.arrow}
                    viewBox="0 0 448 512"
                    width='30px'
                    hanging='30px'
                  >
                    <path
                      d="M207.029 381.476L12.686 187.132c-9.373-9.373-9.373-24.569 0-33.941l22.667-22.667c9.357-9.357 24.522-9.375 33.901-.04L224 284.505l154.745-154.021c9.379-9.335 24.544-9.317 33.901.04l22.667 22.667c9.373 9.373 9.373 24.569 0 33.941L240.971 381.476c-9.373 9.372-24.569 9.372-33.942 0z"
                    ></path>
                  </svg>
                  <div className={s.userPopup}>
                    <div className={s.userPopup_top}>
                      <NavLink className={s.userPopup_link} to={`/user/${currentUser.name}`}>Profile</NavLink>
                      <NavLink className={s.userPopup_link} to='/settings'>Settings</NavLink>
                    </div>
                    <div className={s.userPopup_bot}>
                      <button onClick={handleLogout} className={s.logout}>Logout</button>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  className={s.login}
                  href={`https://anilist.co/api/v2/oauth/authorize?${queryString}`}
                >
                  Log in
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Header
