import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { Player } from '../types/Players'

import WithFetchPlayersData, {
  PlayersDataContext,
} from './WithFetchPlayersData'

import PlayersTable from './PlayersTable'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const players: Player[] = [
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

const MockChildComponent = () => (
  <PlayersDataContext.Consumer>
    {({ players }) => (
      <div role="testing">
        <PlayersTable players={players} />
      </div>
    )}
  </PlayersDataContext.Consumer>
)

describe('WithFetchPlayersData', () => {
  describe('fetch player data', () => {
    it('renders loading screen', async () => {
      render(
        <WithFetchPlayersData>
          <MockChildComponent />
        </WithFetchPlayersData>
      )

      expect(screen.getByText('Loading', { exact: false })).toBeInTheDocument()
      expect(screen.getByText('Loading', { exact: false })).toMatchSnapshot()

      await waitFor(() => {})
    })

    it('renders players component', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { data: players } })

      render(
        <WithFetchPlayersData>
          <MockChildComponent />
        </WithFetchPlayersData>
      )

      await waitFor(() => screen.getByRole('testing'))

      expect(screen.getByRole('testing')).toHaveTextContent('Player')
      expect(screen.getByRole('testing')).toMatchSnapshot()
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        render(
          <WithFetchPlayersData>
            <MockChildComponent />
          </WithFetchPlayersData>
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        expect(screen.getByText('error', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('error', { exact: false })).toMatchSnapshot()
      })
    })
  })
})
