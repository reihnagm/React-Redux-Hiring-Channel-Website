import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from './types'
import setAuthToken from '../utils/setAuthToken'
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const response = await axios.get('http://localhost:5000/auth')
        dispatch({
            type: USER_LOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}
export const login = (email, password) => async dispatch => {
    try {
        const response = await axios.post('http://localhost:5000/auth/login', {
            email,
            password
        })
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })
        dispatch(loadUser())
    }
    catch (error) {
        dispatch({
            type: LOGIN_FAIL
        });
        dispatch(setAlert('Invalid Credentials', 'danger'));
    }
}
export const register = ({ name, email, password, role }) => async dispatch => {
    try {
        const response = await axios.post(`http://localhost:5000/auth/register`, {
            name,
            email,
            password,
            role_id: role.value
        })
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
        dispatch(loadUser())
    }
    catch (error)
    {
        dispatch({
            type: REGISTER_FAIL
        })
        dispatch(setAlert('User already exists.', 'danger'))
    }
}
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}
