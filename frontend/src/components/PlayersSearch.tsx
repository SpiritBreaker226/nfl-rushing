import React, { useContext, ChangeEvent } from 'react'

import { Button, TextField } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/core/styles'

import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

import { setParamsCallback } from './helpers/helpers'

const useStyles = makeStyles(() =>
  createStyles({
    searchText: {
      paddingTop: '0.2em',
      marginRight: '1em',
    },
  })
)

const PlayersSearch = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const handleChangeSearchValue = (e: ChangeEvent<HTMLInputElement>) =>
    dispatch({
      type: Types.UpdateSearch,
      payload: { search: e.target.value },
    })

  return (
    <section>
      <TextField
        type="text"
        name="searchValue"
        id="searchValue"
        value={state.search}
        placeholder="Search by Name"
        className={classes.searchText}
        onChange={handleChangeSearchValue}
      />
      <Button
        variant="outlined"
        onClick={() => {
          setParamsCallback({
            params: { name: state.search },
            url: state.urlToPlayersEndpoint,
            dispatch,
          })
        }}
      >
        Search
      </Button>
    </section>
  )
}

export default PlayersSearch
