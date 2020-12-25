import axios from "axios"
import { decodeJWT } from "../configs/helper"
import { GET_CONVERSATION_LISTS, GET_CONVERSATION_LISTS_ERROR, GET_REPLY_CONVERSATION_REPLIES, GET_REPLY_CONVERSATION_REPLIES_ERROR, CHECK_CONVERSATIONS, CHECK_CONVERSATIONS_ERROR, GET_USER_TWO, GET_USER_TWO_ERROR, GET_CONVERSATION_ID, GET_CONVERSATION_ID_ERROR, INSERT_INTO_CONVERSATION_REPLIES, INSERT_INTO_CONVERSATION_REPLIES_ERROR, CHANGES_REPLY_TO_REALTIME } from "./types"

export const getConversationLists = user_two => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/conversation-lists/${user_two}`)
    dispatch({
      type: GET_CONVERSATION_LISTS,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_LISTS_ERROR,
      payload: error.message
    })
  }
}
export const getReplyConversationReplies = conversation_id => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/conversation-replies/${conversation_id}`)
    dispatch({
      type: GET_REPLY_CONVERSATION_REPLIES,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_REPLY_CONVERSATION_REPLIES_ERROR,
      payload: error.message
    })
  }
}
export const checkConversations = user_two => async dispatch => {
  const token = localStorage.token
  let data, user_one
  if (token) {
    data = decodeJWT(token)
    user_one = data.user.id
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/check-conversations/${user_one}/${user_two}`)
    if (response.data.data.length !== 0) {
      dispatch({
        type: CHECK_CONVERSATIONS,
        payload: response.data.data[0].id
      })
    } else {
      dispatch({
        type: CHECK_CONVERSATIONS,
        payload: null
      })
    }
  } catch (error) {
    dispatch({
      type: CHECK_CONVERSATIONS_ERROR,
      payload: error.message
    })
  }
}
export const getUserTwo = conversation_id => async dispatch => {
  const token = localStorage.token
  let data, user_one, user_two
  if (token) {
    data = decodeJWT(token)
    user_one = data.user.id
  }
  try {
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/user-two/${conversation_id}`)
    if (response.data.data[0].user_two === user_one) {
      user_two = response.data.data[0].user_one
    } else {
      user_two = response.data.data[0].user_two
    }
    dispatch({
      type: GET_USER_TWO,
      payload: user_two
    })
  } catch (error) {
    dispatch({
      type: GET_USER_TWO_ERROR,
      payload: error.message
    })
  }
}
export const getConversationId = user_two => async dispatch => {
  try {
    const response = await axios.get(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/conversation-id/${user_two}`)
    dispatch({
      type: GET_CONVERSATION_ID,
      payload: response.data.data
    })
  } catch (error) {
    dispatch({
      type: GET_CONVERSATION_ID_ERROR,
      payload: error.message
    })
  }
}
export const InsertIntoConversationReplies = (user_two, payload) => async dispatch => {
  const token = localStorage.token
  let message = payload.reply
  let created_at = payload.created_at
  let user_logged_name = payload.name
  let data, user_one
  if (token) {
    data = decodeJWT(token)
    user_one = data.user.id
  }
  try {
    await axios.post(`${process.env.REACT_APP_GET_LOCAL_MESSAGES}/conversation-replies/${user_one}/${user_two}`, {
      message,
      created_at,
      user_logged_name
    })
    dispatch({
      type: INSERT_INTO_CONVERSATION_REPLIES
    })
  } catch (error) {
    dispatch({
      type: INSERT_INTO_CONVERSATION_REPLIES_ERROR,
      payload: error.message
    })
  }
}
export const changesReplyToRealtime = payload => async dispatch => {
  let data = []
  data.push({
    payload
  })
  dispatch({
    type: CHANGES_REPLY_TO_REALTIME,
    payload: data
  })
}
