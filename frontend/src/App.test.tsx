import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { Player } from './types/Players'

import App from './App'

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

describe('App', () => {
  describe('fetch player data', () => {
    it('renders players component', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { data: players } })

      render(<App />)

      await waitFor(() => screen.getByRole('heading'))

      expect(screen.getByRole('heading')).toHaveTextContent('Player')
      expect(screen.getByRole('main')).toMatchSnapshot()
    })
  })
})
