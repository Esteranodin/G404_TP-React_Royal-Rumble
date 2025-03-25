// Selectors pour accéder aux données du state fight


export const selectAllPlayers = (state) => state.fight.players;

export const selectPlayerById = (state, playerId) => 
  state.fight.players.find(player => player.id === playerId);

// export const selectAlivePlayers = (state) => 
//   state.fight.players.filter(player => player.pv > 0);

export const selectMonster = (state) => state.fight.monster;

// export const selectMonsterPV = (state) => state.fight.monster.pv;

export const selectGameStatus = (state) => state.fight.gameStatus;

export const selectActivePlayer = (state) => {
  const activePlayerId = state.fight.currentTurn.playerId;
  return state.fight.players.find(player => player.id === activePlayerId);
};

export const selectCombatMessages = (state) => state.fight.combatMessages;

// export const selectCurrentTurnNumber = (state) => state.fight.currentTurn.turnNumber;

export const selectCurrentPlayerId = (state) => state.fight.currentTurn.playerId;

export const selectIsPlayerTurn = (state, playerId) => 
  state.fight.currentTurn.playerId === playerId;

export const selectRoundNumber = (state) => 
  state.fight.currentTurn.roundNumber;

export const selectHasEnoughMana = (state, playerId, manaCost) => {
  const player = selectPlayerById(state, playerId);
  return player && player.mana >= manaCost;
};