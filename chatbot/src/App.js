import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question) return;
    
    setMessages([...messages, { sender: 'user', text: question }]);  // Add user message
    setLoading(true);
    setQuestion('');

    try {
      const response = await axios.get('http://localhost:5000/get-answer', {
        params: { question }
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: response.data.answer }
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'bot', text: 'Sorry, there was an error processing your request.' }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="header">
        <h1>CDP Support Agent Chatbot</h1>
        <p>Ask me how-to questions about Segment, mParticle, Lytics, and Zeotap.</p>
      </header>

      <div className="chatbox">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <p>{message.text}</p>
          </div>
        ))}

        {loading && (
          <div className="loading">
            <p>Loading...</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        <input
          type="text"
          placeholder="Ask your question..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="question-input"
        />
        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? 'Asking...' : 'Ask'}
        </button>
      </form>
    </div>
  );
}

export default App;
