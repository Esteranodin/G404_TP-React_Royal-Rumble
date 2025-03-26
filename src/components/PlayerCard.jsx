import ButtonCapacity from "./ButtonCapacity/ButtonCapacity";
import ProgressBar from "./ProgressBar/ProgressBar";
import "../App.css";

function PlayerCard({ player, isActive }) {
  return (
    <div
      className={`player-card ${isActive ? 'selected' : ''}`}
    >
      <div className="player-info">
        <h5 className="player-name">{player.name}</h5>
        <h6 className="player-class">
          <i className={`fas ${player.icon}`}></i> {player.class}
        </h6>
      </div>
      
      <ProgressBar
        pv={player.pv}
        pvMax={player.pvMax}
        faType="fa-heart"
        barName=" : pv"
        type="health"
      />
      
      <ProgressBar
        pv={player.mana}
        pvMax={player.manaMax}
        faType="fa-fire-alt"
        barName=" : mana"
        type="mana"
      />

      <ButtonCapacity player={player} />
    </div>
  );
}

export default PlayerCard;
