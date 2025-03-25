import React from 'react';
import { useMessages } from '../../features/fight/hooks/useMessages';
import './Messages.css';

const CombatMessages = () => {
  const { messages } = useMessages();
  
  return (
    <div className="combat-log">
      <h3>Journal de combat</h3>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(CombatMessages);