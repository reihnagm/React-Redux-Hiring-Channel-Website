import React, { useEffect } from 'react';
import * as moment from 'moment';
import { connect } from 'react-redux';
const MessageLists = ({  user, user_two, replies, messagesEndRef, messageMask, setMessageMask }) => {
    let user_id = user !== null && typeof user !== "undefined" && user && user.data && user.data.id
    useEffect(() => {
        setMessageMask(replies);
    },[replies, setMessageMask]);
    return (
        <div ref={messagesEndRef} className="p-2 overflow-y-scroll h-56">
            {messageMask && messageMask.map(message => {
                const box = message.user_id !== user_two ? `box-left` : 'box-right';
                const chatDirection = message.user_id !== user_two ? 'flex justify-start' : 'flex justify-end'
                return (
                    <div className={`${chatDirection}`}>
                        <div 
                            key={message.id} 
                            className={`chat-${box} text-white p-3 my-3`}
                        >
                            <p>
                                {message.reply}
                            </p>
                            <div className="p-2 mt-4 chat-author inline-block"> 
                                from <span className="bold"> {message.name} - {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')} </span>
                            </div> 
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
const mapStateToProps = state => ({
    user: state.auth.user
});
export default connect(
    mapStateToProps,
    { }
)(MessageLists);
