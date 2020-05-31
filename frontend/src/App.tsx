import React, { useState, useEffect } from 'react'

import axios from 'axios'

import { Player } from './types/Players'

import PlayersTable from './components/PlayersTable'

import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [players, setPlayers] = useState<Player[]>([])
  const url = `${process.env.REACT_APP_BASE_API_URL}/players`

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const res = await axios.get(url)
        // console.log('res', res.data.data)
        setPlayers(res.data.data)
        setIsLoading(false)
      } catch (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
      }
    }

    fetchDataFromApi()
  }, [url, setIsLoading, setErrorMessage])

  if (isLoading) {
    return (
      <main className="App">
        <div className="loading">Loading...</div>
      </main>
    )
  }

  const Body = () => {
    if (errorMessage) {
      return <section className="error">{errorMessage}</section>
    }

    return (
      <section className="players">
        <PlayersTable players={players} />
      </section>
    )
  }

  return (
    <main className="App">
      <header className="App-header">
        <h1>Players</h1>
      </header>

      <Body />
    </main>
  )
}

export default App
