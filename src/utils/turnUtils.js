export const getNextPlayer = (players, currentTurn) => {
  // Joueurs encore en vie
  const alivePlayers = players.filter(player => player.pv > 0);
  
  // Joueurs qui n'ont pas encore joué ce round
  const remainingPlayers = alivePlayers.filter(
    player => !currentTurn.playersPlayed.includes(player.id)
  );
  
  return {
    remainingPlayers,
    alivePlayers
  };
};


export const handleRoundEnd = (state, messages) => {
  const alivePlayers = state.players.filter(player => player.pv > 0);
  
  if (state.gameStatus === "playing" && alivePlayers.length > 0) {
    return true; // lancer l'attaque du monstre
  }
  
  return false;
};


export const startNewRound = (state) => {
  state.currentTurn.roundNumber++;
  state.currentTurn.playersPlayed = [];
  state.shouldClearMessages = true;
  
  const alivePlayers = state.players.filter(player => player.pv > 0);
  if (alivePlayers.length > 0) {
    state.currentTurn.playerId = alivePlayers[0].id;
    return alivePlayers[0].name;
  }
  
  return null;
};