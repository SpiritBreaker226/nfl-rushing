import React from 'react'

import WithFetchPlayersData, {
  PlayersDataContext,
} from './components/WithFetchPlayersData'

import PlayersTable from './components/PlayersTable'
import PlayersSearch from './components/PlayersSearch'

import './App.css'

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Players</h1>
      </header>

      <WithFetchPlayersData>
        <PlayersSearch />
        <PlayersDataContext.Consumer>
          {({ players }) => (
            <section className="players">
              <PlayersTable players={players} />
            </section>
          )}
        </PlayersDataContext.Consumer>
      </WithFetchPlayersData>
    </main>
  )
}

export default App
