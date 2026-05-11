'use client';

import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useCallback, useEffect, useMemo, useRef, useState, FormEvent } from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileArrowDown, faPaperPlane, faRobot, faUser } from '@fortawesome/free-solid-svg-icons';

const markdownComponents: Components = {
  a: ({ href, children, ...props }) => (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  ),
};

function downloadTextFile(filename: string, body: string) {
  const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.rel = 'noopener';
  document.body.appendChild(anchor);
  anchor.click();
  document.body.removeChild(anchor);
  URL.revokeObjectURL(url);
}

function ChatMessageMarkdown({ text }: { text: string }) {
  if (!text.trim()) return null;
  return (
    <div className="chatMessageMarkdown">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
        {text}
      </ReactMarkdown>
    </div>
  );
}

export function ChatAssistant() {
  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat' }),
  });
  
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const isLoading = status === 'streaming' || status === 'submitted';
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const getMessageText = useCallback((message: (typeof messages)[0]) => {
    return message.parts
      .filter((part) => part.type === 'text')
      .map((part: { text: string }) => part.text)
      .join('');
  }, []);

  const lastAssistantRawText = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      const message = messages[i];
      if (message.role === 'assistant') {
        const text = getMessageText(message);
        if (text.trim()) return text;
      }
    }
    return null;
  }, [messages, getMessageText]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, customMessage?: string) => {
    e.preventDefault();
    const messageToSend = customMessage || input;
    if (!messageToSend.trim() || isLoading) return;
    
    setInput('');
    await sendMessage({ text: messageToSend });
  };
  
  const handleSuggestionClick = async (suggestion: string) => {
    if (isLoading) return;
    await sendMessage({ text: suggestion });
  };
  
  return (
    <div className="chatAssistant">
      <div className="chatHeader">
        <div className="chatHeaderMain">
          <FontAwesomeIcon icon={faRobot} className="chatHeaderIcon" />
          <div>
            <h2 className="chatHeaderTitle">Logic Pro Guru</h2>
            <p className="chatHeaderSubtitle">Your friendly Logic Pro assistant</p>
          </div>
        </div>
        <button
          type="button"
          className="chatHeaderRawDownload"
          disabled={!lastAssistantRawText || isLoading}
          title="Download the last assistant reply as plain text (exact markdown from the model) to compare with what you see rendered."
          onClick={() => {
            if (!lastAssistantRawText) return;
            const stamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
            downloadTextFile(`logic-pro-guru-raw-reply-${stamp}.txt`, lastAssistantRawText);
          }}
        >
          <FontAwesomeIcon icon={faFileArrowDown} aria-hidden />
          <span className="chatHeaderRawDownloadLabel">Raw reply</span>
        </button>
      </div>
      
      <div className="chatMessages">
        {messages.length === 0 && (
          <div className="chatWelcome">
            <FontAwesomeIcon icon={faRobot} className="chatWelcomeIcon" />
            <h3>Welcome to Logic Pro Guru!</h3>
            <p>Ask me anything about Logic Pro, recording, mixing, or mastering your band.</p>
            <div className="chatSuggestions">
              <button 
                onClick={() => handleSuggestionClick('How do I set up a good vocal chain in Logic Pro?')}
                className="chatSuggestion"
                disabled={isLoading}
              >
                How do I set up a good vocal chain?
              </button>
              <button 
                onClick={() => handleSuggestionClick('What are the best stock plugins for mixing drums?')}
                className="chatSuggestion"
                disabled={isLoading}
              >
                Best stock plugins for mixing drums?
              </button>
              <button 
                onClick={() => handleSuggestionClick('How do I avoid clipping in my mix?')}
                className="chatSuggestion"
                disabled={isLoading}
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
              <div className="chatMessageText">
                <ChatMessageMarkdown text={getMessageText(message)} />
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && messages[messages.length - 1]?.role === 'user' && (
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
          onChange={(e) => setInput(e.target.value)}
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
