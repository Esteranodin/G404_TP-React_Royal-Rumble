import './App.css'
import GameStatus from './components/GameStatus/GameStatus'
import Messages from './components/Messages/Messages'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'

function App() {
  return (
    <div className="game-container">
      <header className="game-header">
        <h1 className="game-title">Legends of Mythia</h1>
      </header>
      
      <div className="battle-section">
        <Monster />
        <Messages />
      </div>
      
      <PlayerList />
      <GameStatus />
    </div>
  )
}

export default App
