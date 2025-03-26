import { createCombatMessage } from "../../utils/messageUtils";
import { clearMessages, addMessage } from "./fightSlice";


export const clearMessagesWithDelay = (roundNumber) => (dispatch) => {
  setTimeout(() => {
    dispatch(clearMessages());
    // Ajout du message de début de round après le nettoyage
    dispatch(addMessage(createCombatMessage('SYSTEM', 'roundStart', roundNumber)));
  }, 3000); 
};