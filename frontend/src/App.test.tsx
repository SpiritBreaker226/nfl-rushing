import React from 'react'

import { waitFor, screen, render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import { Player } from './types/Players'

import App from './App'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const players: Player[] = [
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

describe('App', () => {
  describe('fetch player data', () => {
    beforeEach(async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { data: players } })

      render(<App />)

      await waitFor(() => screen.getByRole('heading'))
    })

    it('renders players component', () => {
      expect(mockedAxios.get).toHaveBeenCalledTimes(1)
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BASE_API_URL}/players`
      )
      expect(screen.getByRole('heading')).toHaveTextContent('Player')
      expect(screen.getByRole('main')).toMatchSnapshot()
    })

    describe('when searching', () => {
      it('find player name Brett', async () => {
        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: 'brett' },
        })

        mockedAxios.get.mockResolvedValueOnce({ data: { data: [players[1]] } })

        fireEvent.click(screen.getByText('Search'))

        expect(
          screen.getByText('Loading', { exact: false })
        ).toBeInTheDocument()

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?name=brett`
        )

        expect(screen.getByRole('textbox')).toHaveDisplayValue('brett')

        expect(screen.getByTestId('Brett HundleyGB')).toHaveTextContent(
          /brett/i
        )
        expect(screen.getAllByRole('row').length).toEqual(2)

        fireEvent.change(screen.getByRole('textbox'), {
          target: { value: 'mike' },
        })

        expect(screen.getByRole('textbox')).toHaveDisplayValue('mike')
      })

      it("reset player's table and URL on blank textbox", async () => {
        mockedAxios.get.mockResolvedValueOnce({ data: { data: [players[1]] } })

        fireEvent.click(screen.getByText('Search'))

        await waitFor(() => screen.getByRole('heading'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players`
        )
        expect(screen.getByTestId('Mark IngramNO')).toHaveTextContent(/mark/i)
        expect(screen.getByTestId('Brett HundleyGB')).toHaveTextContent(
          /brett/i
        )
        expect(screen.getAllByRole('row').length).toEqual(3)
      })
    })
  })
})
