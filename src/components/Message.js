import React from 'react';

export const Message = ({ username, text }) => {
  return (
    <div className="message">
      <div className="message-username">{username}</div>
      <div className="message-text">{text}</div>
    </div>
  );
};

export default Message;
