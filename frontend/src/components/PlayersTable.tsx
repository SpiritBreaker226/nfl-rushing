import React from 'react'
import { Player, Stats } from '../types/Players'

const headers = [
  "Player's Name",
  "Player's team abbreviation",
  "Player's postion",
  'Rushing Attempts',
  'Rushing Attempts Per Game Avg',
  'Total Rushing Yards',
  'Rushing Avg Yards Per Attempt',
  'Rushing Yards Per Game',
  'Total Rushing Touchdowns',
  'Longest Rush',
  'Rushing First Downs',
  'Rushing First Down %',
  'Rushing 20+ Yards Each',
  'Rushing 40+ Yards Each',
  'Rushing Fumbles',
]

export interface PlayersTableProps {
  players: Player[]
}

const PlayersTable = (props: PlayersTableProps) => {
  if (props.players.length === 0) {
    return (
      <section className="no-plyaers-found">
        <span>No Players Found</span>
      </section>
    )
  }

  return (
    <table className="players-table">
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>

      <tbody>
        {props.players.map((player: Player, playerIndex) => {
          const stats: Stats = player.attributes

          return (
            <tr key={`${stats.player}${stats.team}${stats.pos}${playerIndex}`}>
              {Object.values(stats).map((value, index) => (
                <td
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
  )
}

export default PlayersTable
