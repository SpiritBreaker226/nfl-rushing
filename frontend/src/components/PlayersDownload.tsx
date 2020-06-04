import React, { useContext } from 'react'

import queryString from 'query-string'

import { AppContext } from '../contexts/AppContext'

const PlayersDownload = () => {
  const { state } = useContext(AppContext)
  const currentURL = queryString.parseUrl(state.urlToPlayersEndpoint)

  const csvLink = queryString.stringifyUrl({
    url: `${currentURL.url}.csv`,
    query: currentURL.query,
  })

  return (
    <section className="download">
      <a href={csvLink} data-testid="download_csv">
        Download CSV
      </a>
    </section>
  )
}

export default PlayersDownload
