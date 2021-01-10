import axios from "axios"
import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from "./types"
import Swal from "sweetalert2"
import setAuthToken from "../utils/token"

const Toast = Swal.mixin({
  position: "top-end",
  toast: true,
  timer: 3000,
  showConfirmButton: false,
  timerProgressBar: false,
  onOpen: toast => {
    toast.addEventListener("mouseenter", Swal.stopTimer)
    toast.addEventListener("mouseleave", Swal.resumeTimer)
  }
})

export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_LOCAL_AUTH}`)
    dispatch({
      type: USER_LOADED,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: AUTH_ERROR
    })
  }
}
export const login = (email, password, history) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_LOGIN}`, {
      email,
      password
    })
    dispatch({
      type: LOGIN_SUCCESS,
      payload: response.data
    })
    history.push("/")
    Toast.fire({
      icon: "success",
      title: "Successful Login"
    })
    dispatch(loadUser())
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: err.response.data.message
    })
    dispatch({
      type: LOGIN_FAIL
    })
  }
}
export const registerEngineer = (data, history) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_REGISTER}`, data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    history.push("/")
    Toast.fire({
      icon: "success",
      title: "Successful Register"
    })
    dispatch(loadUser())
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: err.response.data.message
    })
    dispatch({
      type: REGISTER_FAIL
    })
  }
}
export const registerCompany = (data, history) => async dispatch => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_LOCAL_REGISTER}`, data)
    dispatch({
      type: REGISTER_SUCCESS,
      payload: response.data
    })
    history.push("/")
    Toast.fire({
      icon: "success",
      title: "Successful Register"
    })
    dispatch(loadUser())
  } catch (err) {
    Toast.fire({
      icon: "error",
      title: err.response.data.message
    })
    dispatch({
      type: REGISTER_FAIL
    })
  }
}
export const logout = () => async dispatch => {
  dispatch({
    type: LOGOUT
  })
}
