import axios from 'axios';
import {
    GET_ENGINEERS,
    GET_ENGINEERS_ERROR,
    GET_CURRENT_PROFILE_ENGINEER,
    GET_CURRENT_PROFILE_ENGINEER_ERROR,
    GET_PROFILE_ENGINEER_BY_SLUG,
    GET_PROFILE_ENGINEER_BY_SLUG_ERROR,
    UPDATE_PROFILE_ENGINEER,
    UPDATE_PROFILE_ENGINEER_ERROR,
    DELETE_ENGINEER,
    DELETE_ENGINEER_ERROR
} from './types'
export const getEngineers = (search = '',sort = 'DESC',sortBy = 'date_updated',limit = '10',page = '1') => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/engineers?search=${search}&sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}`);
        dispatch({
            type: GET_ENGINEERS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_ENGINEERS_ERROR,
            payload: error
        });
    }
}
export const getCurrentProfileEngineer = () => async dispatch => {
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
        const response = await axios.post(`http://localhost:5000/api/v1/engineers/profile`,
            {
                user_id
            });
        dispatch({
            type: GET_CURRENT_PROFILE_ENGINEER,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_CURRENT_PROFILE_ENGINEER_ERROR,
            payload: error
        });
    }
}
export const getProfileEngineerBySlug = (slug) => async dispatch => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/engineers/profile/${slug}`);
        dispatch({
            type: GET_PROFILE_ENGINEER_BY_SLUG,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_PROFILE_ENGINEER_BY_SLUG_ERROR,
            payload: error
        });
    }
}
export const updateProfileEngineer = (id, data) => async dispatch => {
    let engineer_id = id;
    try {
        await axios.patch(`http://localhost:5000/api/v1/engineers/${engineer_id}`, data);
        dispatch({
            type: UPDATE_PROFILE_ENGINEER,
            payload: data
        });
    } catch (error) {
        dispatch({
            type: UPDATE_PROFILE_ENGINEER_ERROR,
            payload: error
        });
    }
}
export const deleteProfileEngineer = (id) => async dispatch => {
    const engineer_id = id;
    try {
        await axios.delete(`http://localhost:5000/api/v1/engineers/${engineer_id}`);
        dispatch({
            type: DELETE_ENGINEER,
            payload: engineer_id
        });
    } catch (error) {
        dispatch({
            type: DELETE_ENGINEER_ERROR,
            payload: error
        });
    }
}
