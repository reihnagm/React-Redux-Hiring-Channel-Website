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
    INSERT_INTO_CONVERSATION_REPLIES_ERROR,
    CHANGES_REPLY_TO_REALTIME
} from '../actions/types'
const initialState = {
    user_two: null,
	conversation_id: null,
	check_conversations: null,
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
        case GET_CONVERSATION_ID:
            return {
                ...state,
                conversation_id: payload
            }
        case GET_CONVERSATION_ID_ERROR:
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
        case CHANGES_REPLY_TO_REALTIME: 
            return {
                ...state,
                replies: [payload, ...state.replies].reverse()
            }
        case INSERT_INTO_CONVERSATION_REPLIES: 
            return {
                ...state
            }
        case INSERT_INTO_CONVERSATION_REPLIES_ERROR: 
            return {
                ...state,
                error: payload
            }
		default:
        	return state;
    }
}
