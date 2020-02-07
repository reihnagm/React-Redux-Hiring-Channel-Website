import axios from 'axios';
import store from '../store';
import { logout } from './auth';
import {
    LOADING,
    LOADED,
    GET_SKILLS,
    GET_SKILLS_ERROR,
    GET_SKILLS_ENGINEER,
    GET_SKILLS_ENGINEER_ERROR,
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
export const getEngineers = (search = '', sort = 'DESC', sortBy = 'date_updated', limit = '10', page = '1') => async dispatch => {
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}?search=${search}&sort=${sort}&sortBy=${sortBy}&limit=${limit}&page=${page}`);
        dispatch({
            type: GET_ENGINEERS,
            payload: response.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_ENGINEERS_ERROR,
            payload: error
        });
    }
}
export const getSkills = () => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/skills`);
        dispatch({
            type: GET_SKILLS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_SKILLS_ERROR,
            payload: error
        });
    }
}
export const getSkillsBasedOnProfileEngineer = (engineer_id) => async dispatch => {
    try {
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/skills-engineer/${engineer_id}`);
        dispatch({
            type: GET_SKILLS_ENGINEER,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_SKILLS_ENGINEER_ERROR,
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
        dispatch({
            type: LOADING
        });
        const response = await axios.post(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/profile`,
            {
                user_id
            });
        dispatch({
            type: GET_CURRENT_PROFILE_ENGINEER,
            payload: response.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_CURRENT_PROFILE_ENGINEER_ERROR,
            payload: error
        });
    }
}
export const getProfileEngineerBySlug = (slug) => async dispatch => {
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/profile/${slug}`);
        dispatch({
            type: GET_PROFILE_ENGINEER_BY_SLUG,
            payload: response.data.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
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
        await axios.patch(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/${engineer_id}`, data);
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
export const deleteProfileEngineer = (engineer_id, user_id) => async dispatch => {
    store.dispatch(logout());
    try {
        await axios.delete(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/${engineer_id}/${user_id}`);
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
