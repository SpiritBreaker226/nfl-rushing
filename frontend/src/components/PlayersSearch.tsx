import React from 'react'

import { PlayersDataContext } from './WithFetchPlayersData'

function PlayersSearch() {
  return (
    <PlayersDataContext.Consumer>
      {({ setParamsCallback, searchValue, handleChangeSearchValue }) => {
        return (
          <section className="search">
            <input
              type="text"
              name="searchValue"
              id="searchValue"
              value={searchValue}
              placeholder="Search by Name"
              onChange={handleChangeSearchValue}
            />
            <button
              onClick={() => {
                setParamsCallback({ params: { name: searchValue } })
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
