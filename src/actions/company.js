import axios from "axios"
import { Toast, auth } from "../utils/helper"
import { LOADING, LOADED, GET_COMPANIES, GET_COMPANIES_ERROR, GET_CURRENT_PROFILE_COMPANY, GET_CURRENT_PROFILE_COMPANY_ERROR, GET_PROFILE_COMPANY_BY_SLUG, GET_PROFILE_COMPANY_BY_SLUG_ERROR, UPDATE_PROFILE_COMPANY, UPDATE_PROFILE_COMPANY_ERROR, DELETE_COMPANY, DELETE_COMPANY_ERROR } from "./types"
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
