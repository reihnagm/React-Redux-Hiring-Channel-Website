import axios from 'axios'
import {
    setAlert
} from './alert';
import {
    GET_ENGINEERS,
    GET_ENGINEER,
    ADD_ENGINEER,
    DELETE_ENGINEER,
    UPDATE_ENGINEER,
    ENGINEER_ERROR
} from './types'

export const getEngineers = (search, limit, sortBy, sort) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GET_ENGINEERS}?search=${search}&limit=${limit}&sortBy=${sortBy}&sort=${sort}`)
        dispatch({
            type: GET_ENGINEERS,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
export const getEngineer = (id) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GET_ENGINEERS}/${id}`)
        dispatch({
            type: GET_ENGINEER,
            payload: response.data[0]
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
export const addEngineer = (data) => async dispatch => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_GET_ENGINEERS}`, data)
        dispatch({
            type: ADD_ENGINEER,
            payload: response.data
        })
        dispatch(setAlert('Engineer Created', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: ENGINEER_ERROR
        })
    }
}
export const updateEngineer = (id, data) => async dispatch => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_GET_ENGINEERS}/${id}`, data)
        dispatch({
            type: UPDATE_ENGINEER,
            payload: response.data
        })
        dispatch(setAlert('Engineer Updated', 'success'))
    } catch (error) {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: ENGINEER_ERROR
        })
    }
}
export const deleteEngineer = (id) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_GET_ENGINEERS}/${id}`)
        dispatch({
            type: DELETE_ENGINEER,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR
        })
    }
}
