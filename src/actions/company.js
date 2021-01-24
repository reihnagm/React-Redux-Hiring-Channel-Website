import axios from "axios"
import { Toast, auth } from "../utils/helper"
import { LOADING, LOADED, EDIT_POST_JOB, EDIT_POST_JOB_ERROR, UPDATE_POST_JOB, UPDATE_POST_JOB_ERROR, STORE_ADD_JOBS, STORE_ADD_JOBS_ERROR, GET_COMPANIES, GET_COMPANIES_ERROR, GET_CURRENT_PROFILE_COMPANY, GET_CURRENT_PROFILE_COMPANY_ERROR, GET_PROFILE_COMPANY_BY_SLUG, GET_PROFILE_COMPANY_BY_SLUG_ERROR, UPDATE_PROFILE_COMPANY, UPDATE_PROFILE_COMPANY_ERROR, DELETE_COMPANY, DELETE_COMPANY_ERROR } from "./types"
export const getCompanies = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/${getState().router.location.search}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_COMPANIES,
      payload: response.data
    })
  } catch (error) {
    dispatch({
      type: GET_COMPANIES_ERROR,
      payload: error
    })
  }
}
export const getCurrentProfileCompany = () => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.post(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/profile`, { userUid: auth().uid })
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_CURRENT_PROFILE_COMPANY_ERROR,
      payload: error
    })
  }
}
export const getProfileCompanyBySlug = slug => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}/profile/${slug}`)
    dispatch({
      type: LOADED
    })
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_PROFILE_COMPANY_BY_SLUG_ERROR,
      payload: error
    })
  }
}
export const storeAddJob = (payload, history) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.post(`${process.env.REACT_APP_STORE_POST_JOB}`, {
      title: payload.title,
      content: payload.content,
      salary: payload.salary,
      skills: JSON.stringify(payload.skills),
      jobtypes: payload.jobtypes,
      companyUid: payload.companyUid
    })
    dispatch({
      type: LOADED
    })
    history.push("/companies")
    Toast.fire({
      icon: "success",
      title: "Company Created"
    })
    dispatch({
      type: STORE_ADD_JOBS
    })
  } catch (err) {
    dispatch({
      type: STORE_ADD_JOBS_ERROR,
      payload: err.message
    })
  }
}
export const updateProfileCompany = (payload, history) => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    await axios.put(`${process.env.REACT_APP_GET_LOCAL_COMPANIES}`, payload)
    Toast.fire({
      icon: "success",
      title: "Profile Updated"
    })
    history.push("/companies")
    dispatch({
      type: LOADED
    })
    dispatch({
      type: UPDATE_PROFILE_COMPANY,
      payload: payload
    })
  } catch (err) {
    dispatch({
      type: UPDATE_PROFILE_COMPANY_ERROR,
      payload: err
    })
  }
}
export const deleteProfileCompany = id => async dispatch => {
  const company_id = id
  try {
    await axios.delete(`http://localhost:5000/api/v1/engineers/${company_id}`)
    dispatch({
      type: DELETE_COMPANY,
      payload: company_id
    })
  } catch (error) {
    dispatch({
      type: DELETE_COMPANY_ERROR,
      payload: error
    })
  }
}

export const editPostJob = slug => async dispatch => {
  try {
    dispatch({
      type: LOADING
    })
    const response = await axios.post(process.env.REACT_APP_EDIT_POST_JOB, {
      slug: slug
    })
    dispatch({
      type: LOADED
    })
    dispatch({
      type: EDIT_POST_JOB,
      payload: response.data.data
    })
  } catch (err) {
    dispatch({
      type: EDIT_POST_JOB_ERROR,
      payload: err
    })
  }
}

export const updatePostJob = slug => async dispatch => {
  try {
    await axios.put(process.env.REACT_APP_UPDATE_POST_JOB)
    dispatch({
      type: UPDATE_POST_JOB
    })
  } catch (err) {
    dispatch({
      type: UPDATE_POST_JOB_ERROR,
      payload: err
    })
  }
}
