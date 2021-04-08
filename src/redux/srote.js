import { combineReducers, createStore, compose, applyMiddleware } from "redux";
import currentUserReduser from './currentUserReduser'
import userReducer from './userReducer'
import thunk from 'redux-thunk'

const redusers = combineReducers({
    currentUser: currentUserReduser,
    user: userReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
    redusers,
    composeEnhancers(applyMiddleware(thunk))
    )

export default store