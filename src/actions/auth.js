// NOTE: this data come from component

import axios from 'axios'
import { setAlert } from './alert'
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    CLEAR_PROFILE
} from './types'

import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const response = await axios.get(process.env.REACT_APP_LOCAL_AUTH)
        dispatch({
            type: USER_LOADED,
            payload: response.data
        })
    } catch (err) {
        dispatch({
            type: AUTH_ERROR
        })
    }
}
export const register = ({ name, email, password, role }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ name, email, password, role_id: role.value })

    try {
        const response = await axios.post(`http://localhost:5000/auth/register`, body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        })
        dispatch(loadUser())
    }
    catch (error)
    {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: REGISTER_FAIL
        })
    }
}
export const login = (email, password) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({ email, password })
    try {
        const response = await axios.post(process.env.REACT_APP_LOCAL_LOGIN, body, config)

        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        })

        dispatch(loadUser())
    }
    catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: LOGIN_FAIL
        })
    }
}
export const logout = () => dispatch => {
    dispatch({ type: LOGOUT })
}
