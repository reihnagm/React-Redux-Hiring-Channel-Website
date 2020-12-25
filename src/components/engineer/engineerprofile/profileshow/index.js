import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getProfileEngineerBySlug } from "../../../../actions/engineer"
import { getConversationLists, getReplyConversationReplies, checkConversations, InsertIntoConversationReplies, changesReplyToRealtime } from "../../../../actions/message"
import Spinner from "../../../spinner"
import ProfileShowItem from "./profileshowitem/profileshowitem"

const Profile = ({ getProfileEngineerBySlug, getConversationLists, getReplyConversationReplies, checkConversations, InsertIntoConversationReplies, changesReplyToRealtime, message: { conversation_lists, check_conversations, replies }, engineer: { engineer, loading }, user: { user }, match }) => {
  useEffect(() => {
    const fetchData = async () => {
      await getProfileEngineerBySlug(match.params.slug)
    }
    fetchData()
  }, [getProfileEngineerBySlug, match])
  return loading ? <Spinner /> : <ProfileShowItem item={engineer} user={user} getConversationLists={getConversationLists} getReplyConversationReplies={getReplyConversationReplies} conversation_lists={conversation_lists} replies={replies} changesReplyToRealtime={changesReplyToRealtime} checkConversations={checkConversations} check_conversations={check_conversations} InsertIntoConversationReplies={InsertIntoConversationReplies} />
}
const mapStateToProps = state => ({
  engineer: state.engineer,
  user: state.auth,
  message: state.message
})
export default connect(mapStateToProps, {
  getProfileEngineerBySlug,
  getConversationLists,
  getReplyConversationReplies,
  checkConversations,
  InsertIntoConversationReplies,
  changesReplyToRealtime
})(Profile)
