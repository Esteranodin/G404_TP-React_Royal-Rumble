import './App.css'
import Monster from './components/Monster/Monster'
import PlayerList from './components/PlayerList'

function App() {

  return (
    <div className="App">
        <Monster />
        <br></br>
        <section className="container-fluid">
          <PlayerList />
        </section >
      </div>
  )
}

export default App
