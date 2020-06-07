import React, { useContext, ChangeEvent, KeyboardEvent } from 'react'

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

export interface PlayersSearchProps {
  onSearchClick: () => {}
}

const PlayersSearch = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)
  const handleChangeSearchBox = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: Types.UpdateSearch,
      payload: { search: e.target.value },
    })
  }
  const handleClickSearch = () => {
    setParamsCallback({
      params: { name: state.search, page: '1' },
      url: state.urlToPlayersEndpoint,
      dispatch,
    })
  }
  const handleTextFieldKeyPress = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'Enter':
        handleClickSearch()
        break
    }
  }

  return (
    <section>
      <TextField
        type="text"
        name="searchBox"
        id="searchBox"
        inputProps={{ 'data-testid': 'searchBox' }}
        value={state.search}
        placeholder="Search by Name"
        className={classes.searchText}
        onKeyPress={handleTextFieldKeyPress}
        onChange={handleChangeSearchBox}
      />

      <Button variant="outlined" onClick={handleClickSearch}>
        Search
      </Button>
    </section>
  )
}

export default PlayersSearch
