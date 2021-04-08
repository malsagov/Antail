import React from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { setCurrentUser } from '../../redux/currentUserReduser'

//rafce
const Test = () => {
    const currentUser = useSelector((state) => {
        return {
            currentUser: state.currentUser.currentUser
        }
    })
    const dispatch = useDispatch()
    React.useEffect(() => {
        dispatch(setCurrentUser({id: 1, userName: 'Ruslan'}))
    }, [])

    console.log(currentUser)
    return (
        <div>
            <p>{currentUser.currentUser.userName}</p>
        </div>
    )
}

export default Test
