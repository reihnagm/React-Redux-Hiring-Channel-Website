import axios from 'axios'
import {
    setAlert
} from './alert'
import {
    GET_ENGINEERS,
    GET_ENGINEER,
    GET_CURRENT_PROFILE_ENGINEER,
    UPDATE_PROFILE_ENGINEER,
    DELETE_ENGINEER,
    ENGINEER_ERROR
} from './types'

export const getEngineers = (search, limit, sortBy, sort) => async dispatch => {
    const limitParse = parseInt(limit)

    try {
        const response = await axios.get(`http://localhost:5000/api/v1/engineers?search=${search}&limit=${limitParse}&sortBy=${sortBy}&sort=${sort}`)
        dispatch({
            type: GET_ENGINEERS,
            payload: response.data.data
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
export const getCurrentProfileEngineer = (user_id) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/engineers/${user_id}`)
        dispatch({
            type: GET_CURRENT_PROFILE_ENGINEER,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
export const updateProfileEngineer = (id, data, history) => async dispatch => {
    try {
        const response = await axios.patch(`http://localhost:5000/api/v1/engineers/${id}`, data)
        dispatch({
            type: UPDATE_PROFILE_ENGINEER,
            payload: response.data
        })

        history.push('/engineers')
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
export const deleteEngineer = (id) => async dispatch => {
    try {
        await axios.delete(`http://localhost:5000/api/v1/engineers/${id}`)
        dispatch({
            type: DELETE_ENGINEER,
            payload: id
        })
    } catch (error) {
        dispatch({
            type: ENGINEER_ERROR,
            payload: error
        })
    }
}
