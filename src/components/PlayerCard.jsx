import ButtonCapacity from "./ButtonCapacity/ButtonCapacity";
import ProgressBar from "./ProgressBar/ProgressBar";

function PlayerCard({ player, isActive }) {
  return (
    <div
      className={`col-sm-3 card center ${isActive ? 'selected' : ''}`}
      id={`joueur${player.id}`}
    >
      <div className="card-body text-center">
        <h5 className="card-title">{player.name}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          <i className={`fas ${player.icon}`}></i> {player.class}
        </h6>
        <ProgressBar
          pv={player.pv}
          pvMax={player.pvMax}
          faType="fa-heart"
          barName=" : pv "
          bgType="bg-danger"
        />
        <ProgressBar
          pv={player.mana}
          pvMax={player.manaMax}
          faType="fa-fire-alt"
          barName=" : mana "
        />

        <span className="badge badge-danger ml-2 " id="degatSpanJ1"></span>
        <div className="row ">
          <div>
            <ButtonCapacity player={player} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlayerCard;
