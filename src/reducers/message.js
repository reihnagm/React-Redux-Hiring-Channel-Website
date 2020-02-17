import {
	GET_MESSAGES,
	GET_MESSAGES_ERROR,
	SEND_MESSAGE,
	SEND_MESSAGE_ERROR,
	GET_SENDER_ID,
	GET_SENDER_ID_ERROR,
	CHECK_PRIVILEGE_MESSAGE,
	CHECK_PRIVILEGE_MESSAGE_ERROR
} from '../actions/types'
const initialState = {
	messages: [],
	sender_id: null,
	check_privilege_message: null,
	error: {}
}
export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
        case GET_MESSAGES:
            return {
                ...state,
                messages: payload
            }
		case GET_MESSAGES_ERROR:
            return {
                ...state,
                error: payload
            }
        case SEND_MESSAGE:
            return {
                ...state,
                messages: [...payload, state.messages]
            }
		case SEND_MESSAGE_ERROR:
            return {
                ...state,
                error: payload
            }
		case GET_SENDER_ID:
            return {
                ...state,
                sender_id: payload
            }
		case GET_SENDER_ID_ERROR:
            return {
                ...state,
                error: payload
            }
		case CHECK_PRIVILEGE_MESSAGE:
			return {
				...state,
				check_privilege_message: payload
			}
		case CHECK_PRIVILEGE_MESSAGE_ERROR:
			return {
				...state,
				error: payload
			}
		default:
        	return state;
    }
}
