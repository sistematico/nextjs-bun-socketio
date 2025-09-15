import React from 'react';

interface Message {
  id: string;
  text: string;
  author: 'me' | 'other' | 'server';
  time: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages: React.FC<ChatMessagesProps> = ({ messages }) => (
  <div style={{
    flex: 1,
    padding: '16px',
    background: '#ece5dd',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  }}>
    {messages.map(msg => (
      <div
        key={msg.id}
        style={{
          alignSelf: msg.author === 'me' ? 'flex-end' : 'flex-start',
          maxWidth: '70%',
          background: msg.author === 'me' ? '#dcf8c6' : msg.author === 'server' ? '#ffeeba' : 'white',
          color: '#222',
          borderRadius: '8px',
          padding: '8px 12px',
          boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
        }}
      >
        <div style={{ fontSize: 15 }}>{msg.text}</div>
        <div style={{ fontSize: 11, textAlign: 'right', color: '#888' }}>{msg.time}</div>
      </div>
    ))}
  </div>
);

export default ChatMessages;
