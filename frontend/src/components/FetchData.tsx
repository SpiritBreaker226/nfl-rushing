import React, { FunctionComponent, useContext, useEffect } from 'react'

import axios from 'axios'

import { Typography } from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    message: {
      margin: theme.spacing(10),
      textAlign: 'center',
    },
  })
)

const FetchData: FunctionComponent = () => {
  const classes = useStyles()
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
            players: res.data.players.data,
            pagination: res.data.pagination,
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

  if (state.isLoading)
    return (
      <div className={classes.message}>
        <Typography variant="h6">Loading...</Typography>
      </div>
    )
  if (state.errorMessage) {
    return (
      <div className={classes.message}>
        <Typography variant="h6" color="error">
          {state.errorMessage}
        </Typography>
      </div>
    )
  }

  return null
}

export default FetchData
