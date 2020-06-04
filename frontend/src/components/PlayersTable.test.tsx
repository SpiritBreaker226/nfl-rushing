import React from 'react'
import { render } from '@testing-library/react'

import { Player } from '../types/Players'

import { AppContext } from '../contexts/AppContext'

import PlayersTable from './PlayersTable'

const players: Player[] = [
  {
    attributes: {
      att: 2,
      attg: '2.0',
      avg: '3.5',
      first: 0,
      first_precentage: '0.0',
      fourty_plus: 0,
      fum: 0,
      lng: 7,
      player: 'Joe Banyard',
      pos: 'RB',
      td: 0,
      team: 'JAX',
      twenty_plus: 0,
      yds: 7,
      ydsg: '7.0',
    },
  },
  {
    attributes: {
      att: 205,
      attg: '12.8',
      avg: '5.1',
      first: 49,
      first_precentage: '23.9',
      fourty_plus: 2,
      fum: 2,
      lng: 75,
      player: 'Mark Ingram',
      pos: 'RB',
      td: 6,
      team: 'NO',
      twenty_plus: 4,
      yds: 1,
      ydsg: '65.2',
    },
  },
  {
    attributes: {
      att: 3,
      attg: '0.8',
      avg: '-0.7',
      first: 0,
      first_precentage: '0.0',
      fourty_plus: 0,
      fum: 1,
      lng: 0,
      player: 'Brett Hundley',
      pos: 'QB',
      td: 0,
      team: 'GB',
      twenty_plus: 0,
      yds: -2,
      ydsg: '-0.5',
    },
  },
]

const makeWrapper = (state: { players: Player[] }) => (
  <AppContext.Provider
    value={{
      state: {
        urlToPlayersEndpoint: '',
        search: '',
        errorMessage: '',
        isLoading: false,
        ...state,
      },
      dispatch: () => null,
    }}
  >
    <PlayersTable />
  </AppContext.Provider>
)

describe('The list of players', () => {
  it('should render as expeected', () => {
    const { getAllByRole } = render(makeWrapper({ players }))

    expect(getAllByRole('columnheader').length).toEqual(15)
    expect(getAllByRole('row').length).toEqual(4)
  })

  describe('when no players are found', () => {
    it('should render no player message', () => {
      const { getByText } = render(makeWrapper({ players: [] }))

      expect(
        getByText('No Players Found', { exact: false })
      ).toBeInTheDocument()
    })
  })
})
