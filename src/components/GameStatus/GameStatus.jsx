import { useSelector, useDispatch } from 'react-redux';
import { resetGame } from '../../features/fight/fightSlice';
import './GameStatus.css';
import { selectGameStatus } from '../../features/fight/fightSelectors';

function GameStatus() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(selectGameStatus);
  
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