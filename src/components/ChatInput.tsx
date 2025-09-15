import React, { useState } from 'react';

interface ChatInputProps {
  onSend: (text: string) => void;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      onSend(text);
      setText('');
    }
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      padding: '12px',
      background: '#f7f7f7',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
      gap: '8px',
    }}>
      <input
        type="text"
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Digite uma mensagem"
        style={{
          flex: 1,
          padding: '10px',
          borderRadius: '20px',
          border: '1px solid #ccc',
          outline: 'none',
        }}
        onKeyDown={e => e.key === 'Enter' && handleSend()}
      />
      <button
        onClick={handleSend}
        style={{
          background: '#25d366',
          color: 'white',
          border: 'none',
          borderRadius: '50%',
          width: 40,
          height: 40,
          fontWeight: 700,
          cursor: 'pointer',
        }}
      >
        ➤
      </button>
    </div>
  );
};

export default ChatInput;
