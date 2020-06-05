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

    describe('when download csv', () => {
      describe('url for the server should match what table looks like', () => {
        it('download a csv all of the players', async () => {
          expect(
            screen.getByText('Download', { exact: false }).getAttribute('href')
          ).toEqual(`${process.env.REACT_APP_BASE_API_URL}/players.csv`)
        })

        it('download a csv a player name mark', async () => {
          fireEvent.change(screen.getByRole('textbox'), {
            target: { value: 'mark' },
          })

          mockedAxios.get.mockResolvedValueOnce({
            data: { data: [players[2]] },
          })

          fireEvent.click(screen.getByText('Search'))

          expect(
            screen.getByText('Loading', { exact: false })
          ).toBeInTheDocument()

          await waitFor(() => screen.getByRole('textbox'))

          expect(
            screen.getByText('Download', { exact: false }).getAttribute('href')
          ).toEqual(
            `${process.env.REACT_APP_BASE_API_URL}/players.csv?name=mark`
          )
        })

        it('download a csv on sorted players', async () => {
          fireEvent.click(screen.getByTestId('yds'))

          await waitFor(() => screen.getByRole('textbox'))

          expect(
            screen.getByText('Download', { exact: false }).getAttribute('href')
          ).toEqual(
            `${process.env.REACT_APP_BASE_API_URL}/players.csv?sort_by=yds&sort_by_dir=asc`
          )
        })
      })
    })

    describe('when sorting', () => {
      it('should up and down on fields that can be sorted', async () => {
        const totalRushingYardsHeader = screen.getAllByRole('columnheader')[5]
        const totalRushingTouchdownsHeader = screen.getAllByRole(
          'columnheader'
        )[8]
        const longestRushHeader = screen.getAllByRole('columnheader')[9]

        expect(totalRushingYardsHeader).toHaveTextContent(/Up down/i)
        expect(totalRushingTouchdownsHeader).toHaveTextContent(/Up down/i)
        expect(longestRushHeader).toHaveTextContent(/Up down/i)
      })

      it('should have the url to the server contain sort by and direction', async () => {
        fireEvent.click(screen.getByTestId('yds'))

        expect(
          screen.queryByText('Loading', { exact: false })
        ).toBeInTheDocument()

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?sort_by=yds&sort_by_dir=asc`
        )

        fireEvent.click(screen.getByTestId('yds'))

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?sort_by=yds&sort_by_dir=desc`
        )

        expect(screen.getAllByRole('columnheader')[5]).toHaveTextContent(
          /down/i
        )
      })

      it('should reset direction when changing sorted field', async () => {
        fireEvent.click(screen.getByTestId('yds'))

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?sort_by=yds&sort_by_dir=asc`
        )

        fireEvent.click(screen.getByTestId('td'))

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?sort_by=td&sort_by_dir=asc`
        )

        const totalRushingYardsHeader = screen.getAllByRole('columnheader')[5]
        let totalRushingTouchdownsHeader = screen.getAllByRole(
          'columnheader'
        )[8]

        expect(totalRushingYardsHeader).toHaveTextContent(/Up down/i)
        expect(totalRushingTouchdownsHeader).toHaveTextContent(/Up/i)

        fireEvent.click(screen.getByTestId('td'))

        await waitFor(() => screen.getByRole('textbox'))

        expect(mockedAxios.get).toHaveBeenLastCalledWith(
          `${process.env.REACT_APP_BASE_API_URL}/players?sort_by=td&sort_by_dir=desc`
        )

        totalRushingTouchdownsHeader = screen.getAllByRole('columnheader')[8]

        expect(totalRushingTouchdownsHeader).toHaveTextContent(/Down/i)
      })
    })
  })

  describe('when loading the page', () => {
    it('should not render no player message and display loading text', async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { data: [] } })

      render(<App />)

      expect(
        screen.queryByText('Loading', { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText('Download', { exact: false })
      ).not.toBeInTheDocument()

      expect(
        screen.queryByText('No Players Found', { exact: false })
      ).not.toBeInTheDocument()

      await waitFor(() => screen.getByRole('textbox'))

      expect(
        screen.queryByText('Loading', { exact: false })
      ).not.toBeInTheDocument()

      expect(
        screen.queryByText('Download', { exact: false })
      ).toBeInTheDocument()

      expect(
        screen.queryByText('No Players Found', { exact: false })
      ).toBeInTheDocument()
    })
  })
})
