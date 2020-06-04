import React, { useContext, ChangeEvent } from 'react'

import { PlayersDataContext } from './WithFetchPlayersData'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

function PlayersSearch() {
  const { state, dispatch } = useContext(AppContext)
  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: Types.UpdateSearch,
      payload: { search: e.target.value },
    })

  return (
    <PlayersDataContext.Consumer>
      {({ setParamsCallback }) => {
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
