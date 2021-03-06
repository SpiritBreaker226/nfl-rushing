import React, { useContext } from 'react'

import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core'
import { Pagination } from '@material-ui/lab'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

import { Player, Stats } from '../types/Players'
import { Types } from '../types/Actions'

import { AppContext } from '../contexts/AppContext'

import PlayersTableHeader from './PlayersTableHeader'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    noPlyaersFound: {
      margin: theme.spacing(10),
      textAlign: 'center',
    },
    pagination: {
      margin: theme.spacing(2),
      float: 'right',
    },
  })
)

const PlayersTable = () => {
  const classes = useStyles()
  const { state, dispatch } = useContext(AppContext)

  if (state.isLoading || state.errorMessage) return null

  if (state.players.length === 0) {
    return (
      <section className={classes.noPlyaersFound}>
        <Typography variant="h4">No Players Found</Typography>
      </section>
    )
  }

  const handleChangePage = (e: unknown, newPage: number) => {
    dispatch({
      type: Types.UpdateURL,
      payload: {
        params: { page: newPage.toString() },
      },
    })
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
      {state.pagination.page_total > 1 && (
        <Pagination
          data-testid="pagination"
          className={classes.pagination}
          shape="rounded"
          count={state.pagination.page_total}
          page={Number(state.pagination.current_page)}
          onChange={handleChangePage}
        />
      )}
    </section>
  )
}

export default PlayersTable
