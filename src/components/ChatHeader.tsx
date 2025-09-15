import React from 'react';

interface ChatHeaderProps {
  contactName: string;
  avatarUrl?: string;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({ contactName, avatarUrl }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    padding: '12px',
    background: '#075e54',
    color: 'white',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
  }}>
    <img
      src={avatarUrl || '/window.svg'}
      alt={contactName}
      style={{ width: 40, height: 40, borderRadius: '50%', marginRight: 12 }}
    />
    <span style={{ fontWeight: 600, fontSize: 18 }}>{contactName}</span>
  </div>
);

export default ChatHeader;
