import React from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

import s from './CardSkeleton.module.sass'

const CardSkeleton = () => {
    return (
        <SkeletonTheme color='rgb(221,230,238)'  highlightColor='rgba(8,143,214,.06)'>
            <div className={s.cards}>
                {
                    Array(6).fill().map((item, i) => {
                        return (
                            <div key={i} className={s.card}>
                                <Skeleton width={185} height={250} className={s.image} />
                                <Skeleton width={160} height={15} />
                            </div>
                        )
                    })
                }
            </div>
        </SkeletonTheme>
    );
}

export default CardSkeleton
