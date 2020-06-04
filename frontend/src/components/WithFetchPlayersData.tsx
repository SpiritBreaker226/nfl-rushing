import React, {
  FunctionComponent,
  createContext,
  useContext,
  useEffect,
} from 'react'

import axios from 'axios'
import queryString from 'query-string'

import { AppContext } from '../contexts/AppContext'

import { PlayerQuery } from '../types/PlayerQuery'
import { Types } from '../types/Actions'

export interface WithFetchDataProps {}
export interface CallbackProps {
  params: PlayerQuery
}

export const PlayersDataContext = createContext({
  setParamsCallback: (options: CallbackProps) => {},
})

const WithFetchPlayersData: FunctionComponent<WithFetchDataProps> = ({
  children,
}) => {
  const { state, dispatch } = useContext(AppContext)

  const setParamsCallback = ({ params }: CallbackProps) => {
    const currentURL = queryString.parseUrl(state.urlToPlayersEndpoint)
    const query = { ...currentURL.query, ...params }
    const url = queryString.stringifyUrl(
      {
        url: currentURL.url,
        query,
      },
      {
        skipEmptyString: true,
        skipNull: true,
      }
    )

    dispatch({ type: Types.UpdateURL, payload: { url } })
  }

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
    <PlayersDataContext.Provider value={{ setParamsCallback }}>
      {children}
    </PlayersDataContext.Provider>
  )
}

export default WithFetchPlayersData
