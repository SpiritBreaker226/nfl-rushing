import React, {
  FunctionComponent,
  createContext,
  useState,
  ChangeEvent,
} from 'react'

import queryString from 'query-string'

import { PlayerQuery } from '../types/PlayerQuery'

import useFetchData from '../hooks/useFetchData'

export interface WithFetchDataProps {}
export interface CallbackProps {
  params: PlayerQuery
}

export const PlayersDataContext = createContext({
  players: [],
  endpointURL: '',
  searchValue: '',
  handleChangeSearchValue: (e: ChangeEvent<HTMLInputElement>) => {},
  setParamsCallback: (options: CallbackProps) => {},
})

const WithFetchPlayersData: FunctionComponent<WithFetchDataProps> = ({
  children,
}) => {
  const [endpointURL, setEndpointURL] = useState(
    `${process.env.REACT_APP_BASE_API_URL}/players`
  )
  const [searchValue, setSearchValue] = useState('')
  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value)
  const setParamsCallback = ({ params }: CallbackProps) => {
    const currentURL = queryString.parseUrl(endpointURL)
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

    setEndpointURL(url)
  }
  const { isLoading, errorMessage, data: players } = useFetchData({
    url: endpointURL,
  })

  if (isLoading) return <div className="loading">Loading...</div>
  if (errorMessage) return <section className="error">{errorMessage}</section>

  return (
    <PlayersDataContext.Provider
      value={{
        players,
        endpointURL,
        setParamsCallback,
        searchValue,
        handleChangeSearchValue,
      }}
    >
      {children}
    </PlayersDataContext.Provider>
  )
}

export default WithFetchPlayersData
