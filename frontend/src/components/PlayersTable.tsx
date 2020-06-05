import React, { useContext } from 'react'

import { Player, Stats } from '../types/Players'

import { AppContext } from '../contexts/AppContext'

import PlayersTableHeader from './PlayersTableHeader'

const PlayersTable = () => {
  const { state } = useContext(AppContext)

  if (state.isLoading) return null

  if (state.players.length === 0) {
    return (
      <section className="no-plyaers-found">
        <span>No Players Found</span>
      </section>
    )
  }

  return (
    <section className="players">
      <table className="players-table">
        <PlayersTableHeader />

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
