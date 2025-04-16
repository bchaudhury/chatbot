import React from 'react';
import Chaticon from '../assets/chatbot.png';

const chatmessage = ({chat}) => {
  return (
    <div className={`message ${chat.role === "model" ? 'bot' : 'user'}-message`}>
        {chat.role === "model" && <img src={Chaticon} alt='chaticon' className=''/>}
        <p className='message-text'>{chat.text}</p>
    </div>
  )
}

export default chatmessage;
