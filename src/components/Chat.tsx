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
  // Persistência do id do cliente
  const getClientId = () => {
    if (typeof window !== "undefined") {
      let id = localStorage.getItem("chat-client-id");
      if (!id) {
        id = "cli-" + Math.random().toString(36).slice(2);
        localStorage.setItem("chat-client-id", id);
      }
      return id;
    }
    return "cli-server";
  };
  const clientIdRef = useRef<string>(getClientId());

  useEffect(() => {
    // Escuta mensagens do servidor
    const handleMessage = (msgObj: { id: string; text: string }) => {
      console.log("[RECEIVED]", msgObj, "Meu id:", clientIdRef.current);
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
    console.log("[SEND]", { id: clientIdRef.current, text });
    socket.emit("message", { id: clientIdRef.current, text });
  };

  return (
    <div
      style={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 0,
        boxShadow: 'none',
        overflow: 'hidden',
        background: '#ece5dd',
      }}
    >
      <ChatHeader contactName="Contato" avatarUrl="/window.svg" />
      <ChatMessages messages={messages} />
      <ChatInput onSend={handleSend} />
    </div>
  );
};

export default Chat;
