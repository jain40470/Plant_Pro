import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const sendMessage = async () => {
    if (!inputValue) return;
    const newMessages = [...messages, { text: inputValue, isUser: true }];
    setMessages(newMessages);
    setInputValue('');

    try {
      // http://127.0.0.1:8000
      const response = await axios.post('https://fastapi-plantpro.onrender.com/api/chatbot', { message: inputValue });
      setMessages([...newMessages, { text: response.data.response, isUser: false }]);
    } catch (error) {
      console.error('Error sending message:', error);
      if (error.response && error.response.status === 422) {
        alert('Your message could not be processed. Please make sure your input is valid.');
      } else {
        alert('An error occurred while sending the message. Please try again later.');
      }
    }
  };

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-4 bg-green-100">
      {/* Left Column */}
      <div className="text-center lg:text-left">
        <h1 className="text-4xl lg:text-5xl font-semibold mb-4 text-green-800">PlantPulse: Plant Farming Assistant</h1>
        <p className="text-lg text-gray-700">
          PlantPro is an innovative agricultural project that aims to empower farmers with AI-driven plant insights. By leveraging the power of artificial intelligence, PlantPro provides farmers with valuable information and recommendations to optimize their crop management and enhance overall productivity. Through advanced technologies and machine learning algorithms, PlantPro offers a comprehensive platform for crop classification, disease detection, seed stage identification, yield prediction, and real-time assistance.
        </p>
      </div>

      {/* Right Column */}
      <div className="bg-white rounded-lg shadow-md p-4" style={{ maxHeight: "600px", marginBottom: "20px" }}>
        <div className="max-h-96 overflow-y-auto mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`py-2 ${message.isUser ? 'text-right' : 'text-left'}`}>
              <span className={`inline-block px-4 py-2 rounded-lg ${message.isUser ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-800'}`}>
                {message.text}
              </span>
            </div>
          ))}
        </div>
        <div className="flex items-center">
          <input
            type="text"
            className="flex-1 mr-2 px-4 py-2 border rounded-lg focus:outline-none focus:border-green-500"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your message here..."
          />
          <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none" onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
