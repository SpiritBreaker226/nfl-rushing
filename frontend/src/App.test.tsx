import React from 'react'

import { waitFor, screen, render, fireEvent } from '@testing-library/react'

import axios from 'axios'

import { players } from './components/helpers/jest_helpers'

import App from './App'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

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

        mockedAxios.get.mockResolvedValueOnce({ data: { data: [players[2]] } })

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
        expect(screen.getAllByRole('row').length).toEqual(4)
      })
    })
  })
})
