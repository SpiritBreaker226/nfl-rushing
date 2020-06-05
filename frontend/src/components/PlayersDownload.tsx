import React, { useContext } from 'react'

import queryString from 'query-string'

import { Link } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { AppContext } from '../contexts/AppContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    download: {
      textAlign: 'right',
      padding: '0.12em 0 0 0',
    },

    link: {
      backgroundColor: '#0078fd',
      padding: '0.5em 0.8em',
      textDecoration: 'none',
      color: '#fff',
      cursor: 'pointer',
      textAlign: 'center',
      fontWeight: 500,
      lineHeight: '32px',
      border: 'none',
      borderRadius: '4px',

      '&:hover': {
        backgroundColor: '#3290fc',
        textDecoration: 'none',
      },
    },
  })
)

const PlayersDownload = () => {
  const classes = useStyles()

  const { state } = useContext(AppContext)

  if (state.isLoading) return null

  const currentURL = queryString.parseUrl(state.urlToPlayersEndpoint)
  const csvLink = queryString.stringifyUrl({
    url: `${currentURL.url}.csv`,
    query: currentURL.query,
  })

  return (
    <section className={classes.download}>
      <Link href={csvLink} data-testid="download_csv" className={classes.link}>
        Download CSV
      </Link>
    </section>
  )
}

export default PlayersDownload
