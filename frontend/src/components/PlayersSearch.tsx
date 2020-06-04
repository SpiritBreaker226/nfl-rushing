import React, { useContext, ChangeEvent } from 'react'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

import { setParamsCallback } from './helpers/helpers'

const PlayersSearch = () => {
  const { state, dispatch } = useContext(AppContext)
  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: Types.UpdateSearch,
      payload: { search: e.target.value },
    })

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
          setParamsCallback({
            params: { name: state.search },
            url: state.urlToPlayersEndpoint,
            dispatch,
          })
        }}
      >
        Search
      </button>
    </section>
  )
}

export default PlayersSearch
