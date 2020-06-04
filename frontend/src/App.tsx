import React from 'react'

import WithFetchPlayersData from './components/WithFetchPlayersData'

import PlayersTable from './components/PlayersTable'
import PlayersSearch from './components/PlayersSearch'

import { AppProvider } from './contexts/AppContext'

import './App.css'

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Players</h1>
      </header>

      <AppProvider>
        <WithFetchPlayersData />
        <PlayersSearch />
        <PlayersTable />
      </AppProvider>
    </main>
  )
}

export default App
