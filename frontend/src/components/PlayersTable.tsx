import React, { useContext } from 'react'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Player, Stats } from '../types/Players'

import { AppContext } from '../contexts/AppContext'

import PlayersTableHeader from './PlayersTableHeader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPlyaersFound: {
      margin: theme.spacing(10),
      textAlign: 'center',
    },
  })
)

const PlayersTable = () => {
  const classes = useStyles()
  const { state } = useContext(AppContext)

  if (state.isLoading) return null

  if (state.players.length === 0) {
    return (
      <section className={classes.noPlyaersFound}>
        <Typography variant="h4">No Players Found</Typography>
      </section>
    )
  }

  return (
    <section>
      <TableContainer>
        <Table>
          <PlayersTableHeader />

          <TableBody>
            {state.players.map((player: Player, playerIndex) => {
              const stats: Stats = player.attributes

              return (
                <TableRow
                  key={`${stats.player}${stats.team}${stats.pos}${playerIndex}`}
                >
                  {Object.values(stats).map((value, index) => (
                    <TableCell
                      data-testid={`${value}${stats.team}`}
                      key={`${stats.player}${stats.team}${stats.pos}${value}${index}`}
                    >
                      {value}
                    </TableCell>
                  ))}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </section>
  )
}

export default PlayersTable
