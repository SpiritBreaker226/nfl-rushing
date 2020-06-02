import React, { FunctionComponent, createContext } from 'react'

import useFetchData from '../hooks/useFetchData'

export interface WithFetchDataProps {}

export const PlayersDataContext = createContext([])

const WithFetchPlayersData: FunctionComponent<WithFetchDataProps> = ({
  children,
}) => {
  const { isLoading, errorMessage, data } = useFetchData({
    url: `${process.env.REACT_APP_BASE_API_URL}/players`,
  })

  if (isLoading) return <div className="loading">Loading...</div>

  if (errorMessage) return <section className="error">{errorMessage}</section>

  return (
    <PlayersDataContext.Provider value={data}>
      {children}
    </PlayersDataContext.Provider>
  )
}

export default WithFetchPlayersData
