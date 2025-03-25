import { useDispatch, useSelector } from 'react-redux';
import { useCallback } from 'react';
import { addMessage, clearMessages } from '../fightSlice';
import { createCombatMessage } from '../../../utils/messageUtils';
import { selectCombatMessages } from '../fightSelectors';

export function useMessages() {
  const dispatch = useDispatch();
  const messages = useSelector(selectCombatMessages);

  const addAttackMessage = useCallback((attackType, playerName, damage) => {
    const message = createCombatMessage('ATTACK', attackType, playerName, damage);
    dispatch(addMessage(message));
  }, [dispatch]);

  const addSystemMessage = useCallback((messageType, ...args) => {
    const message = createCombatMessage('SYSTEM', messageType, ...args);
    dispatch(addMessage(message));
  }, [dispatch]);

  const clearAllMessages = useCallback(() => {
    dispatch(clearMessages());
  }, [dispatch]);

  return {
    messages,
    addAttackMessage,
    addSystemMessage,
    clearAllMessages
  };
}