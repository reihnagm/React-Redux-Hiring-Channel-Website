import axios from 'axios';
import { decodeJWT } from '../configs/helper';
import {
    GET_CONVERSATION_LISTS,
    GET_CONVERSATION_LISTS_ERROR,
    GET_REPLY_CONVERSATION_REPLIES,
	GET_REPLY_CONVERSATION_REPLIES_ERROR,
	CHECK_CONVERSATIONS,
	CHECK_CONVERSATIONS_ERROR,
    GET_USER_TWO,
    GET_USER_TWO_ERROR,
    GET_CONVERSATION_ID,
    GET_CONVERSATION_ID_ERROR,
    INSERT_INTO_CONVERSATIONS,
    INSERT_INTO_CONVERSATIONS_ERROR,
    INSERT_INTO_CONVERSATION_REPLIES,
    INSERT_INTO_CONVERSATION_REPLIES_ERROR
} from './types'
export const getConversationLists = (user_two) => async (dispatch) => {
	let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_conversation_lists/${user_two}`);
        dispatch({
            type: GET_CONVERSATION_LISTS,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_CONVERSATION_LISTS_ERROR,
            payload: error.message
        });
    }
}
export const getReplyConversationReplies = (conversation_id) => async (dispatch) => {
    let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_reply_conversation_replies/${conversation_id}`);
        dispatch({
            type: GET_REPLY_CONVERSATION_REPLIES,
            payload: response.data.data
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
    let data, user_one, response;
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
    }
    if(user_one !== user_two) {
        try {
            response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/check_conversations/${user_one}/${user_two}`);
            dispatch({
                type: CHECK_CONVERSATIONS,
                payload: response.data.data.length
            });
        } catch (error) {
            dispatch({
                type: CHECK_CONVERSATIONS_ERROR, 
                payload: error.message
            });
        }
        if(response.data.data.length === 0) {
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
    let data, user_one, response;
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
    }
    try {
		response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/check_conversations/${user_one}/${user_two}`);
        if(response.data.data.length !== 0) {
            dispatch({
                type: CHECK_CONVERSATIONS,
                payload: response.data.data[0].id
		    });
        } else {
            dispatch({
                type: CHECK_CONVERSATIONS,
                payload: null
		    });
        }
    } catch (error) {
        dispatch({
            type: CHECK_CONVERSATIONS_ERROR, 
            payload: error.message
        });
    }
}
export const getUserTwo = (conversation_id) => async (dispatch) => {
    const token = localStorage.token;
    let data, user_one, user_two, response; 
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
    }
    try {
		response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_user_two/${conversation_id}`);
        if(response.data.data[0].user_two === user_one) {
            user_two = response.data.data[0].user_one;
        } else {
            user_two =  response.data.data[0].user_two;
        }
        dispatch({
			type: GET_USER_TWO,
			payload: user_two
		});
    } catch (error) {
        dispatch({
            type: GET_USER_TWO_ERROR, 
            payload: error.message
        });
    }
}
export const getConversationId = (user_two) => async (dispatch) => {
    let response;
    try {
        response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/get_conversation_id/${user_two}`);
        dispatch({
            type: GET_CONVERSATION_ID,
            payload: response.data.data
        });
    } catch (error) {
        dispatch({
            type: GET_CONVERSATION_ID_ERROR,
            payload: error.message
        });
    }
}
export const InsertIntoConversationReplies = (user_two, dataParam, message, created_at, user_session_name) => async (dispatch) => {
	const token = localStorage.token;
    let data, user_one;
    if(token) {
        data = decodeJWT(token);
        user_one = data.user.id;
	}
    try {
        await axios.post(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/insert_into_conversation_replies/${user_one}/${user_two}`, {
            message,
            created_at,
            user_session_name
        });
        dispatch({
            type: INSERT_INTO_CONVERSATION_REPLIES,
            payload: dataParam.reverse()
        });
        dispatch(getConversationLists(user_two));
    } catch (error) {
        dispatch({
            type: INSERT_INTO_CONVERSATION_REPLIES_ERROR,
            payload: error.message
        });
    }
}