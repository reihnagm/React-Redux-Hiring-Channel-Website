import axios from 'axios'
import { setAlert } from './alert';
import {
    GET_COMPANIES,
    GET_COMPANY,
    ADD_COMPANY,
    DELETE_COMPANY,
    UPDATE_COMPANY,
    COMPANY_ERROR
} from './types'

export const getCompanies = () => async dispatch => {
    try {
        const response = await axios.get(process.env.REACT_APP_GET_LOCAL_COMPANIES)
        dispatch({
            type: GET_COMPANIES,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: COMPANY_ERROR,
            payload: error
        })
    }
}
export const getCompany = (id) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${id}`)
        dispatch({
            type: GET_COMPANY,
            payload: response.data[0]
        })
    }
    catch (error)
    {
        dispatch({
            type: COMPANY_ERROR
        })
    }
}
export const addCompany = (formData) => async dispatch => {
    try {
        const response = await axios.post(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}`, formData)
        dispatch({
            type: ADD_COMPANY,
            payload: response.data
        })
        dispatch(setAlert('Company created', 'success'))
    }
    catch (error)
    {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: COMPANY_ERROR
        })
    }
}

export const updateCompany = (id, formData) => async dispatch => {
    try {
        const response = await axios.patch(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${id}`, formData)
        dispatch({
            type: UPDATE_COMPANY,
            payload: response.data
        })
        dispatch(setAlert('Company updated', 'success'))
    }
    catch (error)
    {
        const errors = error.response.data.errors
        if (errors) {
            errors.forEach(error => dispatch(setAlert(error.msg, 'danger')))
        }
        dispatch({
            type: COMPANY_ERROR
        })
    }
}

export const deleteCompany = (id, history) => async dispatch => {
    try {
        await axios.delete(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${id}`)
        dispatch({
            type: DELETE_COMPANY,
            payload: id
        })
    }
    catch (error)
    {
        dispatch({
            type: COMPANY_ERROR
        })
    }
}
