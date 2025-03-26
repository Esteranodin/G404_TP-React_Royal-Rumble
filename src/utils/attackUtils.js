import { damageRandom, applyDamageToPlayer, applyDamageToMonster } from "./gamePlayUtils";
import { createCombatMessage } from "./messageUtils";


export const handlePlayerAttack = (state, damage, manaCost, attackType) => {
  const currentPlayer = state.players.find(p => p.id === state.currentTurn.playerId);
  const messages = [];
  
  // Vérifier et déduire le mana si nécessaire
  if (manaCost > 0) {
    if (currentPlayer.mana < manaCost) {
      return { success: false, messages };
    }
    currentPlayer.mana -= manaCost;
  }
  
  // Appliquer les dégâts au monstre
  const statusMessage = applyDamageToMonster(state, damage);
  if (statusMessage) {
    messages.push(statusMessage);
  }
  
  return { 
    success: true, 
    messages, 
    currentPlayer 
  };
};

/**
contre-attaque du monstre
 */
export const handleCounterAttack = (state, targetPlayer) => {
  const messages = [];
  
  if (state.monster.pv > 0 && state.gameStatus === "playing") {
    const damageBack = damageRandom(3, 8);
    
    if (damageBack > 0) {
      const messageBack = applyDamageToPlayer(state, damageBack, targetPlayer.id);
      messages.push(createCombatMessage('MONSTER', 'counterAttack', targetPlayer.name, damageBack));
      
      if (messageBack) {
        messages.push(messageBack);
      }
    } else {
      messages.push(createCombatMessage('MONSTER', 'missedAttack'));
    }
  }
  
  return messages;
};

/**
Attaque spéciale de fin de round du monstre
 */
export const handleMonsterSpecialAttack = (state) => {
  const messages = [];
  const alivePlayers = state.players.filter(player => player.pv > 0);
  
  if (alivePlayers.length > 0) {
    const randomIndex = Math.floor(Math.random() * alivePlayers.length);
    const targetPlayer = alivePlayers[randomIndex];
    
    const damageBase = damageRandom(3, 8);
    const finalDamage = damageBase === 0 ? 0 : damageBase * 2;
    
    messages.push(
      finalDamage === 0
        ? createCombatMessage('MONSTER', 'bigMissedAttack', targetPlayer.name)
        : createCombatMessage('MONSTER', 'bigAttack', targetPlayer.name, finalDamage)
    );
    
    const statusMessage = applyDamageToPlayer(state, finalDamage, targetPlayer.id);
    if (statusMessage) {
      messages.push(statusMessage);
    }
  }
  
  return messages;
};