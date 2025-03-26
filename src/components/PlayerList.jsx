import PlayerCard from "./PlayerCard";
import { useSelector } from "react-redux";
import { selectAllPlayers, selectActivePlayer } from "../features/fight/fightSelectors";

function PlayerList() {
  const players = useSelector(selectAllPlayers);
  const activePlayer = useSelector(selectActivePlayer);

  return (
    <div className="player-list">
      {players.map((player) => (
        <PlayerCard
          key={player.id}
          player={player}
          isActive={player.id === activePlayer?.id} 
        />
      ))}
    </div>
  );
}

export default PlayerList;
