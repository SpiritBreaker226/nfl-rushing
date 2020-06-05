import React from 'react'

import FetchData from './components/FetchData'

import PlayersTable from './components/PlayersTable'
import PlayersSearch from './components/PlayersSearch'
import PlayersDownload from './components/PlayersDownload'

import { AppProvider } from './contexts/AppContext'

import './App.css'

function App() {
  return (
    <main className="App">
      <header className="App-header">
        <h1>Players</h1>
      </header>

      <AppProvider>
        <PlayersSearch />
        <PlayersDownload />
        <PlayersTable />
        <FetchData />
      </AppProvider>
    </main>
  )
}

export default App
