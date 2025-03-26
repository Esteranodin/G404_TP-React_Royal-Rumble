import './Monster.css';
import ProgressBar from "../ProgressBar/ProgressBar";
import { useSelector } from 'react-redux';
import { selectMonster } from '../../features/fight/fightSelectors';
import dragonImage from '../../assets/dragon.jpg';

function Monster() {
  const monster = useSelector(selectMonster);
  const getMonsterImage = () => monster.type === 'dragon' ? dragonImage : dragonImage;

  return (
    <div className="monster-card">
      <h3 className="monster-name">{monster.name}</h3>
      <img
        className="monster-image"
        src={getMonsterImage()}
        alt={monster.name}
      />
      <ProgressBar
        pv={monster.pv}
        pvMax={monster.pvMax}
        type="health"
        faType="fa-heart"
        barName=" : pv"
      />
    </div>
  );
}

export default Monster;
