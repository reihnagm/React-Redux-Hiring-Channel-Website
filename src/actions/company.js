import axios from 'axios'
import {
    LOADING,
    LOADED,
    GET_COMPANIES,
    GET_COMPANIES_ERROR,
    GET_CURRENT_PROFILE_COMPANY,
    GET_CURRENT_PROFILE_COMPANY_ERROR,
    GET_PROFILE_COMPANY_BY_SLUG,
    GET_PROFILE_COMPANY_BY_SLUG_ERROR,
    UPDATE_PROFILE_COMPANY,
    UPDATE_PROFILE_COMPANY_ERROR,
    DELETE_COMPANY,
    DELETE_COMPANY_ERROR
} from './types'
export const getCompanies = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${getState().router.location.search}`)
        dispatch({
            type: GET_COMPANIES,
            payload: response.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_COMPANIES_ERROR,
            payload: error
        })
    }
}
export const getCurrentProfileCompany = () => async dispatch => {
    let payload;
    let data;
    let user_id;
    const token = localStorage.token;
    if(token)  {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        payload = decodeURIComponent(atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
        data = JSON.parse(payload);
        user_id = data.user.id;
    }
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.post(`http://localhost:5000/api/v1/companies/profile`,
            {
                user_id
            });
        dispatch({
            type: GET_CURRENT_PROFILE_COMPANY,
            payload: response.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_CURRENT_PROFILE_COMPANY_ERROR,
            payload: error
        });
    }
}
export const getProfileCompanyBySlug = (slug) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.get(`http://localhost:5000/api/v1/companies/profile/${slug}`)
        dispatch({
            type: GET_PROFILE_COMPANY_BY_SLUG,
            payload: response.data.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_PROFILE_COMPANY_BY_SLUG_ERROR,
            payload: error
        })
    }
}
export const updateProfileCompany = (id, data) => async dispatch => {
    let company_id = id;
    try {
        dispatch({
            type: LOADING
        });
        await axios.patch(`http://localhost:5000/api/v1/companies/${company_id}`, data);
        dispatch({
            type: UPDATE_PROFILE_COMPANY,
            payload: data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_COMPANY_ERROR,
            payload: error
        });
    }
}
export const deleteProfileCompany = (id) => async dispatch => {
    const company_id = id;
    try {
        await axios.delete(`http://localhost:5000/api/v1/engineers/${company_id}`)
        dispatch({
            type: DELETE_COMPANY,
            payload: company_id
        })
    }
    catch (error) {
        dispatch({
            type: DELETE_COMPANY_ERROR,
            payload: error
        })
    }
}
