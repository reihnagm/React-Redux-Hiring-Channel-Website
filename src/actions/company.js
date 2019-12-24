import axios from 'axios'
import { setAlert } from './alert';
import {
    GET_COMPANIES,
    COMPANY_ERROR,
} from './types'

export const getAllCompanies = () => async dispatch => {
    try {
        const response = await axios.get(`http://3.90.152.67:5000/api/v1/companies`)
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
