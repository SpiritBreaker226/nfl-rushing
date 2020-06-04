import React, { useContext } from 'react'

import { PlayersDataContext } from './WithFetchPlayersData'

import { AppContext } from '../contexts/AppContext'

function PlayersSearch() {
  const { state } = useContext(AppContext)

  return (
    <PlayersDataContext.Consumer>
      {({ setParamsCallback, handleChangeSearchValue }) => {
        return (
          <section className="search">
            <input
              type="text"
              name="searchValue"
              id="searchValue"
              value={state.search}
              placeholder="Search by Name"
              onChange={handleChangeSearchValue}
            />
            <button
              onClick={() => {
                setParamsCallback({ params: { name: state.search } })
              }}
            >
              Search
            </button>
          </section>
        )
      }}
    </PlayersDataContext.Consumer>
  )
}

export default PlayersSearch
