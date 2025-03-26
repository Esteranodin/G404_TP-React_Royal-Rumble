// Selectors pour accéder aux données du state fight

export const selectAllPlayers = (state) => state.fight.players;

export const selectPlayerById = (state, playerId) => 
  state.fight.players.find(player => player.id === playerId);

export const selectActivePlayer = (state) => {
  const activePlayerId = state.fight.currentTurn.playerId;
  return state.fight.players.find(player => player.id === activePlayerId);
};

export const selectMonster = (state) => state.fight.monster;

export const selectGameStatus = (state) => state.fight.gameStatus;


export const selectCombatMessages = (state) => state.fight.combatMessages;

export const selectShouldClearMessages = (state) => state.fight.shouldClearMessages;

export const selectCurrentPlayerId = (state) => state.fight.currentTurn.playerId;

export const selectIsPlayerTurn = (state, playerId) => 
  state.fight.currentTurn.playerId === playerId;

export const selectRoundNumber = (state) => 
  state.fight.currentTurn.roundNumber;

export const selectHasEnoughMana = (state, playerId, manaCost) => {
  const player = selectPlayerById(state, playerId);
  return player && player.mana >= manaCost;
};