import React, { useRef } from 'react';

// This component is used to handle the chat form submission and input field for the user to send messages.
const chatform = ({chatHistory, setChatHistory, generateBotResponse}) => {
    // 
    const inputRef = useRef();
    // 
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = ''; // Clear the input field after submission
        
        setChatHistory((history) => [...history, { role: 'user', text: userMessage }]);

        setTimeout(() => {
            setChatHistory((history) => [...history, { role: 'model', text: "Please Wait.." }]);
        }, 600); // Simulate a delay for the bot response

        // Call the function to generate bot response    
        generateBotResponse([...chatHistory, { role: 'user', text: userMessage }]); // Call the function to generate bot response 

    }
    
  // 
  return (
    <div>
        <form action='#' className='chat-form' onClick={handleFormSubmit}>
            <input ref={inputRef}  type='text' placeholder='Type your message...' className='message-input' required/>
            <button className="material-symbols-rounded">arrow_upward</button>
        </form>
    </div>
  )
}

export default chatform;
