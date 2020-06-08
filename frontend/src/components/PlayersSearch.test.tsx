import React from 'react'
import axios from 'axios'

import { screen, render, fireEvent } from '@testing-library/react'

import PlayersSearch from './PlayersSearch'
import { MakeWrapper } from './helpers/jest_helpers'
import FetchData from './FetchData'
import { Action, Types } from '../types/Actions'

jest.mock('axios')
const mockedAxios = axios as jest.Mocked<typeof axios>

describe('PlayersSearch', () => {
  it('renders players search', async () => {
    const { getByTestId, getByText } = render(<PlayersSearch />)

    expect(getByText('Search', { exact: false })).toBeInTheDocument()
    expect(getByTestId('searchBox')).toBeInTheDocument()
  })

  describe('using searchBox', () => {
    it('should search on enter', () => {
      const { getByTestId } = render(
        <MakeWrapper
          state={{
            search: 'joe',
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateURL) {
              expect(action.payload.params.name).toEqual('joe')
            }
          }}
        >
          <PlayersSearch />
        </MakeWrapper>
      )

      fireEvent.keyPress(getByTestId('searchBox'), {
        key: 'Enter',
        charCode: 13,
      })
    })

    it('should not search on non-enter key', () => {
      const { getByTestId } = render(
        <MakeWrapper
          state={{}}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateSearch) {
              expect(action.payload.search).toEqual('j')
            }
          }}
        >
          <PlayersSearch />
        </MakeWrapper>
      )

      fireEvent.keyPress(getByTestId('searchBox'), {
        key: 'j',
        charCode: 74,
      })

      fireEvent.change(screen.getByTestId('searchBox'), {
        target: { value: 'j' },
      })
    })
  })
})
