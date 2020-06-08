import React, { useContext } from 'react'

import {
  TableHead,
  TableRow,
  TableCell,
  TableSortLabel,
} from '@material-ui/core'

import { AppContext } from '../contexts/AppContext'

import { Types } from '../types/Actions'
import { Direction } from '../types/PlayerQuery'

const headers = [
  { name: "Player's Name", sortByField: '' },
  { name: "Player's team abbreviation", sortByField: '' },
  { name: "Player's postion", sortByField: '' },
  { name: 'Rushing Attempts', sortByField: '' },
  { name: 'Rushing Attempts Per Game Avg', sortByField: '' },
  { name: 'Total Rushing Yards', sortByField: 'yds' },
  { name: 'Rushing Avg Yards Per Attempt', sortByField: '' },
  { name: 'Rushing Yards Per Game', sortByField: '' },
  { name: 'Total Rushing Touchdowns', sortByField: 'td' },
  { name: 'Longest Rush', sortByField: 'sortByLng' },
  { name: 'Rushing First Downs', sortByField: '' },
  { name: 'Rushing First Down %', sortByField: '' },
  { name: 'Rushing 20+ Yards Each', sortByField: '' },
  { name: 'Rushing 40+ Yards Each', sortByField: '' },
  { name: 'Rushing Fumbles', sortByField: '' },
]

const PlayersTableHeader = () => {
  const { state, dispatch } = useContext(AppContext)
  const handleOnClick = (sortByField: string) => {
    let dir: Direction =
      state.sorting.dir && state.sorting.dir === 'asc' ? 'desc' : 'asc'

    // reset direction on field change
    if (sortByField !== state.sorting.fieldName) dir = 'asc'

    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: {
          sort_by: sortByField,
          sort_by_dir: dir,
          page: state.pagination.current_page.toString(),
        },
      },
    })

    dispatch({
      type: Types.UpdateSorting,
      payload: {
        sorting: {
          fieldName: sortByField,
          dir,
        },
      },
    })
  }

  return (
    <TableHead>
      <TableRow>
        {headers.map(({ name, sortByField }) => (
          <TableCell component="th" key={name}>
            {sortByField ? (
              <TableSortLabel
                data-testid={sortByField}
                active={sortByField === state.sorting.fieldName}
                direction={
                  sortByField === state.sorting.fieldName
                    ? state.sorting.dir
                    : 'asc'
                }
                onClick={() => handleOnClick(sortByField)}
              >
                {name}
              </TableSortLabel>
            ) : (
              name
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  )
}

export default PlayersTableHeader
