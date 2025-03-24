import { useDispatch, useSelector } from "react-redux";
import "./ButtonCapacity.css";
import { punchHit, fireBall, swordHit, swordHitCharged, hitBack, addCombatMessage } from "../../features/fight/fightSlice";
import { attacks } from "../../features/fight/attacksConfig";
import { damageRandom, getAttackResultMessage } from "../../utils/gamePlay";

function ButtonCapacity({ player }) {
  const dispatch = useDispatch();
  const gameStatus = useSelector(state => state.fight.gameStatus);
  
  // Joueur KO ou partie terminée
  const isDisabled = player.pv === 0 || gameStatus !== "playing";

  const handleAttack = (attackType, damage) => {
    // Ne rien faire si le joueur est KO ou si la partie est terminée
    if (isDisabled) return;
    
    // Attaque du joueur
    if (attackType === "punchHit") {
      dispatch(punchHit(damage));
    } else if (attackType === "swordHit") {
      dispatch(swordHit(damage));
    } else if (attackType === "swordHitCharged") {
      dispatch(swordHitCharged(damage));
    } else if (attackType === "fireBall") {
      dispatch(fireBall(damage));
    }

    const damageBack = damageRandom(3, 8);
    dispatch(hitBack({ damageBack, targetId: player.id }));

    const message = getAttackResultMessage(damageBack);
    dispatch(addCombatMessage(message));
  };

  return (
    <div className="button-container">
      {attacks.map((attack, index) => (
        <button
          key={index}
          type="button"
          onClick={() => handleAttack(attack.actionType, attack.damage)}
          className="btn btn-success material-tooltip-main"
          disabled={isDisabled}
        >
          {attack.name}
          <i className={attack.icon}></i>
        </button>
      ))}
    </div>
  );
}

export default ButtonCapacity;
