import { useQuery, gql } from "@apollo/client"
import { userAPI } from "../api"

const SET_CURRENT_USER = 'SET_CURRENT_USER'
const IS_LOADING = 'IS_LOADING'
const LOGOUT = 'LOGOUT'

const initialState = {
    currentUser: {
        id: null,
        name: '',
        avatar: {
            medium: '',
            large: ''
        },
        about: ''
    },
    isAuthorized: false,
    isLoading: false
}

const currentUserReduser = (state = initialState, action) => {
    switch(action.type){
        case IS_LOADING: 
            return {
                ...state,
                isLoading: true,
                isAuthorized: false
            }
        case SET_CURRENT_USER:
            return {
                ...state,
                currentUser: {
                    ...state.currentUser,
                    ...action.payload.Viewer
                },
                isAuthorized: true,
                isLoading: false
            }
        case LOGOUT:
            return {
                ...state,
                currentUser: {},
                isAuthorized: false,
                isLoading: false
            }
        default:
            return state
    }
}

export const setIsLoading = () => ({type: IS_LOADING})
export const setCurrentUser = (user) => ({type: SET_CURRENT_USER, payload: user})
export const logout = () => ({type: LOGOUT})

export const getCurrentUser = () => async (dispatch) => {
    dispatch(setIsLoading())
    const res = await userAPI.getCurrentUser()
    dispatch(setCurrentUser(res))
}

export default currentUserReduser