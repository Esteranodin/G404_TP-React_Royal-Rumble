import './App.css'
import GameStatus from './components/GameStatus/GameStatus'
import Messages from './components/Messages/Messages'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'


function App() {

  return (
    <div className="App">
        <Messages />
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList />
        </section >
        <GameStatus />
      </div>
  )
}

export default App
