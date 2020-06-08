import React from 'react'

import { Grid, Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import FetchData from './components/FetchData'
import PlayersTable from './components/PlayersTable'
import PlayersSearch from './components/PlayersSearch'
import PlayersDownload from './components/PlayersDownload'
import ErrorBoundary from './components/ErrorBoundary'

import { AppProvider } from './contexts/AppContext'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBody: {
      paddingBottom: theme.spacing(2),
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(2),
    },

    headerActions: {
      marginTop: theme.spacing(1),
    },

    header: {
      backgroundColor: theme.palette.secondary.main,
      padding: theme.spacing(2),
    },
  })
)

function App() {
  const classes = useStyles()

  return (
    <main>
      <ErrorBoundary>
        <AppProvider>
          <header className={classes.header}>
            <Grid container>
              <Grid item xs={2}>
                <Typography variant="h1">Players</Typography>
              </Grid>
              <Grid item xs={6} className={classes.headerActions}>
                <PlayersSearch />
              </Grid>
              <Grid item xs={4} className={classes.headerActions}>
                <PlayersDownload />
              </Grid>
            </Grid>
          </header>

          <div className={classes.appBody}>
            <PlayersTable />
            <FetchData />
          </div>
        </AppProvider>
      </ErrorBoundary>
    </main>
  )
}

export default App
