import axios from "axios";
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from "./types"
import Swal from "sweetalert2";
import setAuthToken from "../utils/setAuthToken";
const Toast = Swal.mixin({
    position: "top-end",
    toast: true,
    timer: 3000,
    showConfirmButton: false,
    timerProgressBar: false,
    onOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer)
        toast.addEventListener("mouseleave", Swal.resumeTimer)
    }
});
export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }
    try {
        const response = await axios.get(`${process.env.REACT_APP_LOCAL_AUTH}`);
        dispatch({
            type: USER_LOADED,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: AUTH_ERROR
        });
    }
}
export const login = (email, password) => async dispatch => {
    try {
        if(email.trim() === "") {
            throw new Error("Email Required.");
        }
        let regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
        let checkEmail = regexp.test(email);
        if(!checkEmail) {
            throw new Error("Invalid Email. e.g : johndoe@gmail.com");
        }
        if(password.trim() === '') {
            throw new Error("Password Required.");
        }
        if(password.length < 6) {
            throw new Error("Password Minimum 6 Character.");
        }
        const response = await axios.post(`${process.env.REACT_APP_LOCAL_AUTH}/login`, {
            email,
            password
        });
        Toast.fire({
            icon: "success",
            title: "Successfull Login."
        });
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data
        });
        dispatch(loadUser());
    } catch (error) {
        if(error.message === "Request failed with status code 500") {
            error.message = "User not exists.";
        }
        Toast.fire({
            icon: "error",
            title: error.message
        });
        dispatch({
            type: LOGIN_FAIL
        });
    }
}
export const register = (name, email, password, role, history) => async dispatch => {
    try {
        if(name.trim() === "") {
            throw new Error("Name Required.");
        }
        if(email.trim() === "") {
            throw new Error("Email Required.");
        }
        let regexp = /[a-zA-z-0-9_]+@[a-zA-Z]+\.(com|net|org)$/
        let checkEmail = regexp.test(email);
        if(!checkEmail) {
            throw new Error("Invalid Email. e.g : johndoe@gmail.com");
        }
        if(password.trim() === "") {
            throw new Error("Password Required.");
        }
        if(password.length < 6) {
            throw new Error("Password Minimum 6 Character.");
        }
        if(typeof role === "undefined") {
            throw new Error("Role Required.")
        }
        const response = await axios.post(`${process.env.REACT_APP_LOCAL_AUTH}/register`, {
            name,
            email,
            password,
            role_id: role.value
        });
        if(role.value === 1) {
            history.push("/engineers");
        }
        if(role.value === 2) {
            history.push("/companies");
        }
        Toast.fire({
            icon: "success",
            title: "Successfull Register."
        });
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data
        });
        dispatch(loadUser());
    } catch (error) {
        if(error.message === "Request failed with status code 500") {
            error.message = "User already exists.";
        }
        Toast.fire({
            icon: "error",
            title: error.message
        });
        dispatch({
            type: REGISTER_FAIL
        });
    }
}
export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
    await axios.post(`${process.env.REACT_APP_LOCAL_AUTH}/logout`);
}
