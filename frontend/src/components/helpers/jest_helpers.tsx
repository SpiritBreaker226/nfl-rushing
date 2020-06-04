import React, { FunctionComponent } from 'react'

import { Player } from '../../types/Players'

import { AppContext } from '../../contexts/AppContext'

export const players: Player[] = [
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

export interface TestingState {
  players?: Player[]
  urlToPlayersEndpoint?: string
  search?: string
  errorMessage?: string
  isLoading?: boolean
}

export interface MakeWrapperProps {
  state: TestingState
}

export const MakeWrapper: FunctionComponent<MakeWrapperProps> = ({
  state,
  children,
}) => (
  <AppContext.Provider
    value={{
      state: {
        players: [],
        urlToPlayersEndpoint: '',
        search: '',
        errorMessage: '',
        isLoading: false,
        ...state,
      },
      dispatch: () => null,
    }}
  >
    {children}
  </AppContext.Provider>
)
