import React, { useEffect } from 'react';
const Message = ({  replies, messageMask, setMessageMask }) => {
    useEffect(() => {
        setMessageMask(replies);
    },[replies, setMessageMask]);
    const getMessages = (
        <div className="overflow-y-scroll h-56">
            {messageMask && messageMask.map(message => {
                return (
                    <div key={message.id} className="chat-box text-white rounded p-3 my-3">
                        {message.reply} - from {message.name}
                    </div>
                )
            })}
        </div>
    )
    const dontHaveMessage = (
        <div className="chat-box text-white rounded p-3 my-3">
            <p> You don`t have a messages. </p>
        </div>
    )
    return (
        <>
            { getMessages }
        </>
    )
}
export default Message;
