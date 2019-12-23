import axios from 'axios'

import {
    GET_ENGINEERS,
    ENGINEER_ERROR
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

// export const AddEngineer = () => async dispatch => {
//     try {
//
//     }
//     catch (error) {
//         dispatch({
//             type: ADD_ENGINEER_ERROR
//         })
//     }
// }

// export const uploadAvatar = (file) => async dispatch => {
//     try {

//     }
// }
