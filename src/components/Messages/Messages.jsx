import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useMessages } from '../../features/fight/hooks/useMessages';
import { selectRoundNumber, selectShouldClearMessages } from '../../features/fight/fightSelectors';
import { setShouldClearMessages } from '../../features/fight/fightSlice';
import { clearMessagesWithDelay } from '../../features/fight/fightActions';
import './Messages.css';

const CombatMessages = () => {
  const dispatch = useDispatch();
  const shouldClearMessages = useSelector(selectShouldClearMessages);
  const roundNumber = useSelector(selectRoundNumber);

  const { messages } = useMessages();
  const messagesEndRef = useRef(null);

  // Vérifie si déclenche nettoyage asynchrone des messages
  useEffect(() => {
    if (shouldClearMessages) {
      dispatch(setShouldClearMessages(false));
      dispatch(clearMessagesWithDelay(roundNumber));
    }
  }, [shouldClearMessages, roundNumber, dispatch]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const isPlayerTurnMessage = (message) => {
    return message.startsWith("C'est au tour de");
  };

  const isRoundStartMessage = (message) => {
    return message.startsWith("🔄 Round");
  };

  const isMonsterTurnMessage = (message) => {
    return message.startsWith("🔥 C'est au tour du monstre");
  };

  return (
    <div className="combat-log">
      <h3>Journal de combat</h3>
      <ul>
        {messages.map((message, index) => (
          <li 
            key={index} 
            className={`
              ${isPlayerTurnMessage(message) ? 'player-turn-message' : ''}
              ${isRoundStartMessage(message) ? 'round-start-message' : ''}
              ${isMonsterTurnMessage(message) ? 'monster-turn-message' : ''}
            `}
          >
            {message}
          </li>
        ))}
      </ul>
      <div ref={messagesEndRef}></div>
    </div>
  );
};

export default React.memo(CombatMessages);