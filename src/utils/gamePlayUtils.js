export function damageRandom(min, max) {
 
  const missOpportunity = Math.random();
  
  // Si le nombre aléatoire est inférieur à 0.2 (20% de chances), l'attaque rate
  if (missOpportunity < 0.2) {
    return 0;
  }
  
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * Vérifie si le joueur a gagné (monstre vaincu)
 * @param {Object} monster - État du monstre
 * @returns {boolean} - True si le monstre est vaincu
 */
export const checkVictory = (monster) => {
  return monster.pv <= 0;
};

/**
 * Vérifie si le joueur a perdu (tous les joueurs sont KO)
 * @param {Array} players - Tableau des joueurs
 * @returns {boolean} - True si tous les joueurs sont KO
 */
export const checkDefeat = (players) => {
  return players.every(player => player.pv <= 0);
};

/**
 * Met à jour l'état du jeu et ajoute un message approprié si nécessaire
 * @param {Object} state - État Redux actuel
 * @returns {string|null} - Nouveau message de combat à ajouter, ou null si aucun
 */
export const updateGameStatus = (state) => {

  if (checkVictory(state.monster)) {
    state.gameStatus = "victory";
    return "Victoire ! Le monstre a été vaincu !";
  }
  

  if (checkDefeat(state.players)) {
    state.gameStatus = "defeat";
    return "Défaite ! Tous les joueurs sont KO !";
  }
  
  return null;
};

/**
 * Applique les dégâts au monstre et vérifie l'état du jeu
 * @param {Object} state - État Redux actuel
 * @param {number} damage - Dégâts à infliger
 * @returns {string|null} - Message à ajouter au journal de combat
 */
export const applyDamageToMonster = (state, damage) => {

  state.monster.pv = Math.max(0, state.monster.pv - damage);
  
  return updateGameStatus(state);
};

/**
 * Applique les dégâts à un joueur et vérifie l'état du jeu
 * @param {Object} state - État Redux actuel
 * @param {number} damage - Dégâts à infliger
 * @param {number} playerId - ID du joueur ciblé
 * @returns {string|null} - Message à ajouter au journal de combat
 */
export const applyDamageToPlayer = (state, damage, playerId) => {
  const targetPlayer = state.players.find(player => player.id === playerId);
  
  if (targetPlayer) {
    targetPlayer.pv = Math.max(0, targetPlayer.pv - damage);
    
    return updateGameStatus(state);
  }
  
  return null;
};