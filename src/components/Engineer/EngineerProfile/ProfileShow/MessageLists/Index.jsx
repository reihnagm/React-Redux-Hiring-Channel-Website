import React, { useEffect } from 'react';
import * as moment from 'moment';
const MessageLists = ({  replies, messageMask, setMessageMask }) => {
    useEffect(() => {
        setMessageMask(replies);
    },[replies, setMessageMask]);
    const getMessages = (
        <div className="p-2 overflow-y-scroll h-56">
            {messageMask && messageMask.map(message => {
                return (
                    <>
                        <div key={message.id} className="chat-box text-white p-3 my-3">
                            <div>
                                {message.reply}
                            </div>
                            <div className="p-2 mt-4 inline-block" style={{ backgroundColor: 'red' }}> 
                                from <span className="bold"> {message.name} - {moment(message.created_at).format('YYYY-MM-DD HH:mm:ss')} </span>
                            </div> 
                        </div>
                    </>
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
