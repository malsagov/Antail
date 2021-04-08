import {userAPI} from '../api'

const SET_USER = '/user/SET_USER'
const IS_LOADING = 'user/IS_LOADING'

const initialState = {
    user: {},
    isLoading: false
}

const userReducer = (state = initialState, action) => {
    switch(action.type){
        case IS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case SET_USER:
            return {
                ...state,
                user: action.payload,
                isLoading: false
            }
        default:
            return state
    }
}

export const setUser = (user) => ({type: SET_USER, payload: user})
export const setIsLoading = () => ({type: IS_LOADING})

export const getUser = (userName) => async (dispatch) => {
    dispatch(setIsLoading())
    const user = await userAPI.getUser(userName)
    dispatch(setUser(user.User))
}

export default userReducer
