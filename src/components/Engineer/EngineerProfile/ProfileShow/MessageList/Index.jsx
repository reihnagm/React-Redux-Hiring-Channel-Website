import React, { useEffect, useState } from 'react';
const Message = ({ checkPrivilegeMessage, messages, messageMask, setMessageMask }) => {
    const [count, setCount] = useState(null);
    useEffect(() => {
        setMessageMask(messages.data);
        if(checkPrivilegeMessage === 0 && checkPrivilegeMessage === null) {
            return false;
        } else {
            setCount(checkPrivilegeMessage);
        }
    },[messages, setMessageMask, checkPrivilegeMessage, setCount]);
    const getMessages = (
        <div className="overflow-y-scroll h-56">
            {messageMask && messageMask.map(message => {
                return (
                    <div key={message.id} className="chat-box text-white rounded p-3 my-3">
                        {message.message} - from {message.name}
                    </div>
                )
            })}
        </div>
    )
    const dontHaveMessage = (
        <div className="chat-box text-white rounded p-3 my-3">
            <p> You not have a messages. </p>
        </div>
    )
    return (
        <>
            { count === 0 ? dontHaveMessage : getMessages }
        </>
    )
}
export default Message;
