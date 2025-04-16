import React, { useRef, useState, useEffect } from 'react';
import Mainlogo from '../src/assets/Favicon.png';
import ChatBotIcon from '../src/assets/chatbot.png';
import ChatForm from './components/chatform';
import ChatMessage from './components/chatmessage';
import './App.css';

const App = () => {

  const[chatHistory, setChatHistory] = useState([]);

  const chatBodyRef = useRef();

  const generateBotResponse = async (history) => {

    const updateHistory = (text) => {
      setChatHistory(prev => [...prev.filter(msg => msg.text !== "Please Wait.."), { role: "model", text }]);
    }

    // const history = chatHistory.map(({role,text}) => ({role, parts: [{text}]}));

    history = history.map(({role,text}) => ({role, parts: [{text}]}));

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({contents: history})
    }

    try{
      const response = await fetch(import.meta.env.VITE_API_URL, requestOptions);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error.message || "Something went wrong");
      console.log("Response:", data);
      const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").
      trim();
      updateHistory(apiResponseText);

    } catch (error) {
      console.log("Error:", error);  
    }

  }

  useEffect(() => {
    chatBodyRef.current.scrollTo({top: chatBodyRef.current.scrollHeight, behavior: "smooth"});
  }, [chatHistory]);

  return (
    <div className='container'>
      <div className='chatbot-popup'>

        {/* /* chatbot Header */}
        <div className='chatbot-header'>
          <div className='header-info'>
            <img src={Mainlogo} alt='chaticon' className=''/>
            <h2 className='logo-text'>SmartChat</h2>
          </div>
          <button className="material-symbols-rounded">keyboard_arrow_down</button>
        </div>

        {/* Chatbot Body */}
        <div ref={chatBodyRef} className='chatbot-body'>
          <div className='message bot-message'>
            <img src={ChatBotIcon} alt='chaticon' className=''/>
            <p className='message-text'>Hello! How can I assist you today?</p>
          </div>

          {/* Chat History */ }
          {chatHistory.map((chat, index) => (
            <ChatMessage key={index} chat={chat}/>
          ))}

        </div>  

        {/* /* Chatbot Footer */}
        <div className='chatbot-footer'>
          <ChatForm  chatHistory={chatHistory} setChatHistory={setChatHistory} generateBotResponse={generateBotResponse}/>
        </div>

      </div>      
    </div>
  )
}

export default App;
