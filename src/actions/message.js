import axios from 'axios';
import { decodeJWT } from '../configs/helper';
import {
    GET_MESSAGES,
    GET_MESSAGES_ERROR,
    SEND_MESSAGE,
    SEND_MESSAGE_ERROR,
    GET_SENDER_ID,
    GET_SENDER_ID_ERROR,
    CHECK_PRIVILEGE_MESSAGE,
    CHECK_PRIVILEGE_MESSAGE_ERROR
} from './types'
export const getMessages = (receiver_id) => async (dispatch) => {
    const token = localStorage.token;
    let data;
    let sender_id;
    if(token) {
        data = decodeJWT(token);
        sender_id = data.user.id;
    }
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/messages/${sender_id}/${receiver_id}`);
        dispatch({
            type: GET_MESSAGES,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: GET_MESSAGES_ERROR,
            payload: error
        });
    }
}
export const getSenderId = (receiver_id) => async (dispatch) => {
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/messages/${receiver_id}`);
        dispatch({
            type: GET_SENDER_ID,
            payload: response.data.data[0].sender_id
        });
    } catch (error) {
        dispatch({
            type: GET_SENDER_ID_ERROR,
            payload: error
        });
    }
}
export const checkPrivilegeMessage = (sender_id_db, receiver_id) => async (dispatch) => {
    const token = localStorage.token;
    let sender_id;
    let data;
    if(token) {
        data = decodeJWT(token);
        sender_id = data.user.id;
    }
    if(sender_id_db === "") {
        sender_id = data.user.id;
        if(sender_id === receiver_id) {
            sender_id = sender_id_db;
        }
    }
    try {
        const response = await axios.get(`http://localhost:5000/api/v1/messages/check/${sender_id}/${receiver_id}`);
        dispatch({
            type: CHECK_PRIVILEGE_MESSAGE,
            payload: response.data.data[0].total
        });
    } catch (error) {
        dispatch({
            type: CHECK_PRIVILEGE_MESSAGE_ERROR,
            payload: error
        });
    }
}
export const sendMessage = (sender_id_db, receiver_id, message) => async (dispatch) => {
    let receiver_id_from_param = receiver_id;
    const token = localStorage.token;
    let data;
    let sender_id;
    if(token) {
        data = decodeJWT(token);
        sender_id = data.user.id;
    }
    if(sender_id_db === "") {
        sender_id = data.user.id; // kalo belum pernah ngechat, pengirim yang sedang login membuat pesan baru
    } else {
        receiver_id = sender_id_db; // kalo udah pernah ngechat maka si pengirim akan diubah menjadi penerima untuk menerima pesan
        if(receiver_id === sender_id) {
            receiver_id = receiver_id_from_param;
        } // kalo si id penerima nya sama dengan id pengirim, maka penerima diubah menjadi id receiver yang dari param bukan dari database
    }
    try {
        const response = await axios.post(`http://localhost:5000/api/v1/messages/${sender_id}/${receiver_id}`, {
            message
        });
        dispatch({
            type: SEND_MESSAGE,
            payload: response
        });
    } catch (error) {
        dispatch({
            type: SEND_MESSAGE_ERROR,
            payload: error
        });
    }
}
