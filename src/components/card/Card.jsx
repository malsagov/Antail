import React from 'react'
import { NavLink } from 'react-router-dom'

import s from './Card.module.sass'

const Card = ({url, id, coverImage, title}) => {
    return (
        <div className={s.card}>
            <NavLink className={s.imageLink} to={`${url}${id}`}>
                <img className={s.image} src={coverImage.extraLarge} alt={title.english || title.userPreferred}/>
            </NavLink>
            <NavLink className={s.cardTitle} to={`${url}${id}`}>{title.english || title.userPreferred}</NavLink>
        </div>
    )
}

export default Card
