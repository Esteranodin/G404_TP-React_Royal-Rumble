import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { attack } from '../fightSlice';
import { selectCurrentPlayerId, selectGameStatus } from '../fightSelectors';
import { attacksConfig } from '../attacksConfig';
import { damageRandom } from '../../../utils/gamePlayUtils';
import { useMessages } from './useMessages';

/**
 * Hook personnalisé pour gérer les attaques
 * @param {Object} player - joueur 
 * @param {string} attackType - attaques
 * @returns {Object} - Les fonctions et états pour gérer l'attaque
 */
export function useAttack(player, attackType) {
  const dispatch = useDispatch();
  const { addAttackMessage, addSystemMessage } = useMessages();
  
  // Récupération des informations de l'état global
  const gameStatus = useSelector(selectGameStatus);
  const currentPlayerId = useSelector(selectCurrentPlayerId);
  
  // Configuration de l'attaque
  const attackSettings = attacksConfig.find(attack => attack.actionType === attackType);
  const manaCost = attackSettings?.manaCost || 0;
  
  // Déterminer si le bouton doit être désactivé
  const isPlayerTurn = currentPlayerId === player.id;
  const isgamePlayUtilsing = gameStatus === "playing";
  const isPlayerAlive = player.pv > 0;
  const hasEnoughMana = player.mana >= manaCost;
  
  const isDisabled = !isPlayerTurn || !isgamePlayUtilsing || !isPlayerAlive;
  
  // Fonction pour calculer les dégâts
  const calculateDamage = useCallback(() => {
    return damageRandom(attackSettings.minDamage, attackSettings.maxDamage);
  }, [attackSettings]);
  
  // Fonction pour gérer l'attaque
  const handleAttack = useCallback(() => {
    if (isDisabled) return;
    
    if (!hasEnoughMana) {
      addSystemMessage('notEnoughMana');
      return;
    }
    
    // Code existant pour les attaques normales
    const damage = calculateDamage();
    
    // Ajouter le message d'attaque
    addAttackMessage(attackType, player.name, damage);
    
    // Dispatcher l'action d'attaque
    dispatch(attack({
      damage,
      attackType,
      manaCost
    }));
  }, [
    dispatch, 
    isDisabled, 
    hasEnoughMana, 
    attackType, 
    manaCost, 
    player.name, 
    calculateDamage, 
    addAttackMessage, 
    addSystemMessage
  ]);
  
  return {
    handleAttack,
    isDisabled,
    notEnoughMana: !hasEnoughMana,
    manaCost,
    attackSettings
  };
}