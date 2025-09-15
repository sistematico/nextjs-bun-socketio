import React, { useState, useEffect, useRef } from 'react';
import { socket } from "@/lib/socket";
import ChatHeader from './ChatHeader';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

type Message = {
  id: string;
  text: string;
  author: "me" | "other" | "server";
  time: string;
};

const initialMessages: Message[] = [];


export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  // Gera um id único para o cliente
  const clientIdRef = useRef<string>("cli-" + Math.random().toString(36).slice(2));

  useEffect(() => {
    // Escuta mensagens do servidor
    const handleMessage = (msgObj: { id: string; text: string }) => {
      setMessages((prev) => [
        ...prev,
        {
          id: String(Date.now()),
          text: msgObj.text,
          author:
            msgObj.id === clientIdRef.current
              ? "me"
              : msgObj.id === "server"
              ? "server"
              : "other",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    };
    socket.on("message", handleMessage);
    return () => {
      socket.off("message", handleMessage);
    };
  }, []);

  const handleSend = (text: string) => {
    // Envia para o servidor
    socket.emit("message", { id: clientIdRef.current, text });
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
