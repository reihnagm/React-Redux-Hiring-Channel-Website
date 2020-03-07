import {
    GET_CONVERSATION_LISTS,
    GET_CONVERSATION_LISTS_ERROR,
    GET_REPLY_CONVERSATION_REPLIES,
    GET_REPLY_CONVERSATION_REPLIES_ERROR,
	CHECK_CONVERSATIONS,
	CHECK_CONVERSATIONS_ERROR,
    GET_USER_TWO,
    GET_USER_TWO_ERROR,
    GET_CONVERSATIONS_LAST_ID,
    GET_CONVERSATIONS_LAST_ID_ERROR,
    INSERT_INTO_CONVERSATIONS,
    INSERT_INTO_CONVERSATIONS_ERROR,
    RESET_CONVERSATION_ID
} from '../actions/types'
const initialState = {
    user_two: null,
	conversation_id: null,
	check_conversations: null,
	check_conversations_users_reply: null,
	conversation_lists: [],
    replies: [],
	error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_CONVERSATION_LISTS:
            return {
                ...state, 
                conversation_lists: payload
            }
        case GET_CONVERSATION_LISTS_ERROR:
            return {
                ...state, 
                error: payload
            }
        case GET_REPLY_CONVERSATION_REPLIES:
            return {
                ...state, 
                replies: payload
            }
        case GET_REPLY_CONVERSATION_REPLIES_ERROR:
            return {
                ...state, 
                error: payload
            }
        case GET_USER_TWO: 
            return { 
                ...state,
                user_two: payload
            }
        case GET_USER_TWO_ERROR: 
            return {
                ...state,
                error: payload
            }
        case CHECK_CONVERSATIONS:
            return {
                ...state,
                check_conversations: payload
            }
		case CHECK_CONVERSATIONS_ERROR:
            return {
                ...state,
                error: payload
			}
        case GET_CONVERSATIONS_LAST_ID:
            return {
                ...state,
                conversation_id: payload
            }
        case GET_CONVERSATIONS_LAST_ID_ERROR:
            return {
                ...state,
                error: payload
            }
        case INSERT_INTO_CONVERSATIONS: 
            return {
                ...state
            }
        case INSERT_INTO_CONVERSATIONS_ERROR: 
            return {
                ...state,
                error: payload
            }
        case RESET_CONVERSATION_ID: 
            return {
                ...state,
                conversation_id: payload,
                replies: []
            }
		default:
        	return state;
    }
}
