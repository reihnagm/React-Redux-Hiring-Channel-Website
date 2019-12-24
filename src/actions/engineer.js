import axios from 'axios'
import { setAlert } from './alert';
import {
    GET_ENGINEERS,
    ENGINEER_ERROR,
    ADD_ENGINEER,
    ADD_ENGINEER_FAIL,
    DELETE_ENGINEER,
    DELETE_ENGINEER_FAIL
} from './types'

export const getAllEngineers = (search, limit, sortBy) => async dispatch => {
    try {
        const response = await axios.get(`http://3.90.152.67:5000/api/v1/engineers?search=${search}&limit=${limit}&sortBy=${sortBy}`)
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

export const add_engineer = (formAddEngineer) => async dispatch => {
    try {
        const response = await axios.post(`http://3.90.152.67:5000/api/v1/engineers`, formAddEngineer)
        dispatch({
            type: ADD_ENGINEER,
            payload: response.data
        })
    }
    catch (error)
    {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: ADD_ENGINEER_FAIL
        })
    }
}

export const delete_engineer = (id) => async dispatch => {
    try {
        const response = await axios.delete(`http://3.90.152.67:5000/api/v1/engineers/${id}`)
        dispatch({
            type: DELETE_ENGINEER,
            payload: response.data
        })
    }
    catch (error)
    {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: DELETE_ENGINEER_FAIL
        })
    }
}
