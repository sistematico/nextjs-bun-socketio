import React, { useState } from 'react';
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type Message = {
  id: string;
  text: string;
  author: "me" | "other";
  time: string;
};

const initialMessages: Message[] = [
  { id: '1', text: 'Olá! 👋', author: 'other', time: '09:00' },
  { id: '2', text: 'Oi! Tudo bem?', author: 'me', time: '09:01' },
];

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState(initialMessages);

  const handleSend = (text: string) => {
    setMessages([
      ...messages,
      {
        id: String(messages.length + 1),
        text,
        author: 'me',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  };

  return (
    <div style={{
      width: 400,
      height: 600,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '8px',
      boxShadow: '0 2px 12px rgba(0,0,0,0.12)',
      overflow: 'hidden',
      background: '#ece5dd',
    }}>
      <ChatHeader contactName="Contato" avatarUrl="/window.svg" />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
