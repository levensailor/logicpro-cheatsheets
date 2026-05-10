'use client';

import { useChat } from 'ai/react';
import { useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';

export function ChatAssistant() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
    initialMessages: [],
  });
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  return (
    <div className="chatAssistant">
      <div className="chatHeader">
        <FontAwesomeIcon icon={faRobot} className="chatHeaderIcon" />
        <div>
          <h2 className="chatHeaderTitle">Logic Pro Guru</h2>
          <p className="chatHeaderSubtitle">Your friendly Logic Pro assistant</p>
        </div>
      </div>
      
      <div className="chatMessages">
        {messages.length === 0 && (
          <div className="chatWelcome">
            <FontAwesomeIcon icon={faRobot} className="chatWelcomeIcon" />
            <h3>Welcome to Logic Pro Guru!</h3>
            <p>Ask me anything about Logic Pro, recording, mixing, or mastering your band.</p>
            <div className="chatSuggestions">
              <button 
                onClick={() => handleSubmit(new Event('submit') as any, { 
                  data: { message: 'How do I set up a good vocal chain in Logic Pro?' } 
                })}
                className="chatSuggestion"
              >
                How do I set up a good vocal chain?
              </button>
              <button 
                onClick={() => handleSubmit(new Event('submit') as any, { 
                  data: { message: 'What are the best stock plugins for mixing drums?' } 
                })}
                className="chatSuggestion"
              >
                Best stock plugins for mixing drums?
              </button>
              <button 
                onClick={() => handleSubmit(new Event('submit') as any, { 
                  data: { message: 'How do I avoid clipping in my mix?' } 
                })}
                className="chatSuggestion"
              >
                How do I avoid clipping in my mix?
              </button>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <div 
            key={message.id} 
            className={`chatMessage ${message.role === 'user' ? 'chatMessageUser' : 'chatMessageAssistant'}`}
          >
            <div className="chatMessageIcon">
              <FontAwesomeIcon icon={message.role === 'user' ? faUser : faRobot} />
            </div>
            <div className="chatMessageContent">
              <div className="chatMessageText">{message.content}</div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="chatMessage chatMessageAssistant">
            <div className="chatMessageIcon">
              <FontAwesomeIcon icon={faRobot} />
            </div>
            <div className="chatMessageContent">
              <div className="chatTypingIndicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="chatInputForm">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Ask about Logic Pro, mixing, or mastering..."
          className="chatInput"
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="chatSubmitButton"
          disabled={isLoading || !input.trim()}
        >
          <FontAwesomeIcon icon={faPaperPlane} />
        </button>
      </form>
    </div>
  );
}
