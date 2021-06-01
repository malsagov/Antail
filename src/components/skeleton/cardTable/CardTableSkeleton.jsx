import React from 'react'
import Skeleton, {SkeletonTheme} from 'react-loading-skeleton'

import s from './CardTableSkeleton.module.sass'

const CardTableSkeleton = () => {
    return (
        <SkeletonTheme color='rgb(221,230,238)'  highlightColor='rgba(8,143,214,.06)'>
                <div className={s.cards}>
                    {
                        Array(6).fill().map((item, i) => {
                            return(
                                <div key={i} className={s.card}>
                                    <Skeleton width={48} height={60} className={s.image}/>
                                    <Skeleton width={120} height={20} className={s.title}/>
                                    <Skeleton width={90} height={10} className={s.rate}/>
                                </div>
                            )
                        })
                    }
                </div>
        </SkeletonTheme>
    );
}

export default CardTableSkeleton
