import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
} from 'react'

import axios from 'axios'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'

export interface WithFetchDataProps {}

export const PlayersDataContext = createContext(null)

const WithFetchPlayersData: FunctionComponent<WithFetchDataProps> = ({
  children,
}) => {
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

  return (
    <PlayersDataContext.Provider value={null}>
      {children}
    </PlayersDataContext.Provider>
  )
}

export default WithFetchPlayersData
