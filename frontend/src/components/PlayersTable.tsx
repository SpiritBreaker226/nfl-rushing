import React, { useContext } from 'react'

import { Player, Stats } from '../types/Players'
import { Types } from '../types/Actions'
import { Direction } from '../types/PlayerQuery'

import { AppContext } from '../contexts/AppContext'

import { setParamsCallback } from './helpers/helpers'

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

const PlayersTable = () => {
  const { state, dispatch } = useContext(AppContext)

  if (state.isLoading) return null

  if (state.players.length === 0) {
    return (
      <section className="no-plyaers-found">
        <span>No Players Found</span>
      </section>
    )
  }

  const SortingArrow = ({ sortByField }: { sortByField: string }) => {
    if (!state.sorting.fieldName || sortByField !== state.sorting.fieldName) {
      return <React.Fragment>Up Down</React.Fragment>
    } else if (state.sorting.dir && state.sorting.dir === 'desc') {
      return <React.Fragment>Down</React.Fragment>
    }

    return <React.Fragment>Up</React.Fragment>
  }

  return (
    <section className="players">
      <table className="players-table">
        <thead>
          <tr>
            {headers.map(({ name, sortByField }) => (
              <th key={name}>
                {name}

                {sortByField && (
                  <button
                    data-testid={sortByField}
                    onClick={() => {
                      let dir: Direction =
                        state.sorting.dir && state.sorting.dir === 'asc'
                          ? 'desc'
                          : 'asc'

                      // reset direction on field change
                      if (
                        !state.sorting.fieldName ||
                        sortByField !== state.sorting.fieldName
                      )
                        dir = 'asc'

                      dispatch({
                        type: Types.UpdateSorting,
                        payload: {
                          sorting: {
                            fieldName: sortByField,
                            dir,
                          },
                        },
                      })

                      setParamsCallback({
                        params: { sort_by: sortByField, sort_by_dir: dir },
                        url: state.urlToPlayersEndpoint,
                        dispatch,
                      })
                    }}
                  >
                    <SortingArrow sortByField={sortByField} />
                  </button>
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {state.players.map((player: Player, playerIndex) => {
            const stats: Stats = player.attributes

            return (
              <tr
                key={`${stats.player}${stats.team}${stats.pos}${playerIndex}`}
              >
                {Object.values(stats).map((value, index) => (
                  <td
                    data-testid={`${value}${stats.team}`}
                    key={`${stats.player}${stats.team}${stats.pos}${value}${index}`}
                  >
                    {value}
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>
    </section>
  )
}

export default PlayersTable
