import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '../../features/fight/fightSlice';
import './GameStatus.css';

function GameStatus() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(state => state.fight.gameStatus);
  
  if (gameStatus === "playing") {
    return null;
  }
  
  return (
    <div className={`game-status ${gameStatus}`}>
      <h2>
        {gameStatus === "victory" 
          ? "🎉 Victoire ! Vous avez vaincu le monstre !" 
          : "☠️ Défaite ! Tous les joueurs sont KO !"}
      </h2>
      <button 
        className="btn btn-primary"
        onClick={() => dispatch(resetGame())}
      >
        Nouvelle partie
      </button>
    </div>
  );
}

export default GameStatus;