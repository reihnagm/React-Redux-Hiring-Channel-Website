import axios from 'axios';
import store from '../store';
import { decodeJWT } from '../configs/helper';
import { logout } from './auth';
import {
    LOADING,
    LOADED,
    GET_SKILLS,
    GET_SKILLS_ERROR,
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
export const getEngineers = () => async (dispatch, getState) => {
    try {
        dispatch({
            type: LOADING
        });
        const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_ENGINEERS}/${getState().router.location.search}`);
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
export const getCurrentProfileEngineer = () => async dispatch => {
    const token = localStorage.token;
    let user_id;
    let data;
    if(token) {
        data = decodeJWT(token);
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
