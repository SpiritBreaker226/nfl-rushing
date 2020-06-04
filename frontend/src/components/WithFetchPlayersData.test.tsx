import React from 'react'

import { waitFor, screen, render } from '@testing-library/react'

import axios from 'axios'

import { AppContext } from '../contexts/AppContext'

import WithFetchPlayersData from './WithFetchPlayersData'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

const makeWrapper = (state: { isLoading?: boolean; errorMessage?: string }) => (
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
    <WithFetchPlayersData />
  </AppContext.Provider>
)

describe('WithFetchPlayersData', () => {
  describe('fetch player data', () => {
    it('renders loading screen', async () => {
      render(makeWrapper({ isLoading: true }))

      expect(screen.getByText('Loading', { exact: false })).toBeInTheDocument()
      expect(screen.getByText('Loading', { exact: false })).toMatchSnapshot()

      await waitFor(() => {})
    })

    describe('on error from the server', () => {
      it('should render an error message', async () => {
        mockedAxios.get.mockRejectedValue(new Error('fake error message'))

        render(
          makeWrapper({
            errorMessage: 'fake error message',
          })
        )

        await waitFor(() => screen.getByText('error', { exact: false }))

        expect(screen.getByText('error', { exact: false })).toBeInTheDocument()
        expect(screen.getByText('error', { exact: false })).toMatchSnapshot()
      })
    })
  })
})
