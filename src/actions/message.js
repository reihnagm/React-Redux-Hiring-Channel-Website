import axios from 'axios';
import { decodeJWT } from '../configs/helper';
import {
    LOADING,
    LOADED,
    GET_CONVERSATION_LISTS,
    GET_CONVERSATION_LISTS_ERROR,
    GET_REPLY_CONVERSATION_REPLIES,
    GET_REPLY_CONVERSATION_REPLIES_ERROR,
    CHECK_CONVERSATIONS,
    CHECK_CONVERSATIONS_ERROR,
    GET_CONVERSATIONS_LAST_ID,
    GET_CONVERSATIONS_LAST_ID_ERROR,
    INSERT_INTO_CONVERSATIONS,
    INSERT_INTO_CONVERSATIONS_ERROR,
    INSERT_INTO_CONVERSATION_REPLIES,
    INSERT_INTO_CONVERSATION_REPLIES_ERROR
} from './types'
export const getConversationLists = (user_two) => async (dispatch) => {
    const token = localStorage.token;
    let data, user_session, get_conversation_lists;
    if(token) {
        data = decodeJWT(token);
        user_session = data.user.id;
    }
    try {
        dispatch({
            type: LOADING
        });
        get_conversation_lists = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_conversation_lists/${user_two}`);
        dispatch({
            type: GET_CONVERSATION_LISTS,
            payload: get_conversation_lists.data.data
        });
        setTimeout(() => {
            dispatch({
                type: LOADED
            });
        }, 800);
    } catch (error) {
        dispatch({
            type: GET_CONVERSATION_LISTS_ERROR,
            payload: error.message
        });
    }
}
export const getReplyConversationReplies = (conversations_id) => async (dispatch) => {
    let get_reply_conversation_replies;
    try {
        get_reply_conversation_replies = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_reply_conversation_replies/${conversations_id}`);
        dispatch({
            type: GET_REPLY_CONVERSATION_REPLIES,
            payload: get_reply_conversation_replies.data.data
        });
    } catch(error) {
        dispatch({
            type: GET_REPLY_CONVERSATION_REPLIES_ERROR,
            payload: error.message
        });
    }
}
export const creatingConversations = (user_two) => async (dispatch) => {
    const token = localStorage.token;
    let data, check_conversations, user_one;
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
    }
    if(user_one !== user_two) {
        try {
            check_conversations = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/check_conversations/${user_one}/${user_two}`);
            dispatch({
                type: CHECK_CONVERSATIONS,
                payload: check_conversations.data.data.length
            });
        } catch (error) {
            dispatch({
                type: CHECK_CONVERSATIONS_ERROR, 
                payload: error.message
            });
        }
        if(check_conversations.data.data.length === 0) {
            try {
                await axios.post(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/insert_into_conversations/${user_one}/${user_two}`);
                dispatch({
                    type: INSERT_INTO_CONVERSATIONS 
                });
            } catch (error) {
                dispatch({
                    type: INSERT_INTO_CONVERSATIONS_ERROR,
                    payload: error.message
                });
            }
        }
    }
}
export const checkConversations = (user_two) => async (dispatch) => {
    const token = localStorage.token;
    let data, check_conversations, user_one;
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
    }
    try {
        check_conversations = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/check_conversations/${user_one}/${user_two}`);
        dispatch({
            type: CHECK_CONVERSATIONS,
            payload: check_conversations.data.data.length
        });
    } catch (error) {
        dispatch({
            type: CHECK_CONVERSATIONS_ERROR, 
            payload: error.message
        });
    }
}
export const getConversationsLastId = (user_two) => async (dispatch) => {
    let get_conversations_last_id;
    try {
        get_conversations_last_id = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_conversations_last_id/${user_two}`);
        dispatch({
            type: GET_CONVERSATIONS_LAST_ID,
            payload: get_conversations_last_id.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_CONVERSATIONS_LAST_ID_ERROR,
            payload: error.message
        });
    }
}
export const InsertIntoConversationReplies = (conversation_id, message) => async (dispatch) => {
    const token = localStorage.token;
    let data, user_session;
    if(token) {
        data = decodeJWT(token);
        user_session = data.user.id;
    }
    try {
        await axios.post(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/insert_into_conversation_replies/${user_session}/${conversation_id}`, {
            message
        });
        dispatch({
            type: INSERT_INTO_CONVERSATION_REPLIES
        });
    } catch (error) {
        dispatch({
            type: INSERT_INTO_CONVERSATION_REPLIES_ERROR,
            payload: error.message
        });
    }
}