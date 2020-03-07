import React, { useEffect } from 'react';
const MessageLists = ({  replies, messageMask, setMessageMask }) => {
    useEffect(() => {
        setMessageMask(replies);
    },[replies, setMessageMask]);
    const getMessages = (
        <div className="p-2 overflow-y-scroll h-56">
            {messageMask && messageMask.map(message => {
                return (
					<div key={message.id} className="chat-box text-white p-3 my-3">
						{message.reply} - from {message.name}
					</div>
                )
            })}
        </div>
    )
    return (
        <>
            { getMessages }
        </>
    )
}
export default MessageLists;
