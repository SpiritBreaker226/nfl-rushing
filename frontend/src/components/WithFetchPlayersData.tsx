import React, { FunctionComponent, useContext, useEffect } from 'react'

import axios from 'axios'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'

const WithFetchPlayersData: FunctionComponent = () => {
  const { state, dispatch } = useContext(AppContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({
          type: Types.UpdateLoading,
          payload: { isLoading: true },
        })

        const res = await axios.get(state.urlToPlayersEndpoint)

        dispatch({
          type: Types.UpdatePlayers,
          payload: {
            players: res.data.data,
            isLoading: false,
          },
        })
      } catch (error) {
        dispatch({
          type: Types.UpdateErrorMessageFromServer,
          payload: {
            isLoading: false,
            errorMessage: error.message,
          },
        })
      }
    }

    fetchData()
  }, [dispatch, state.urlToPlayersEndpoint])

  if (state.isLoading) return <div className="loading">Loading...</div>
  if (state.errorMessage) {
    return <section className="error">{state.errorMessage}</section>
  }

  return null
}

export default WithFetchPlayersData
