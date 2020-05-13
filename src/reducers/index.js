import loggedReducer from './isLogged';
import userReducer from './userReducer';
import {combineReducers} from 'redux';

const allReducers = combineReducers({
    isLogged: loggedReducer,
    user: userReducer,
})

export default allReducers;