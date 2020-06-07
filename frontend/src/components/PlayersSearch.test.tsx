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
    const { getByRole, getByText } = render(<PlayersSearch />)

    expect(getByText('Search', { exact: false })).toBeInTheDocument()
    expect(getByRole('textbox')).toBeInTheDocument()
  })

  it('should search on enter from textbox', () => {
    const { getByRole } = render(
      <MakeWrapper
        state={{
          search: 'joe',
        }}
        dispatch={(action: Action) => {
          if (action.type === Types.UpdateURL) {
            expect(action.payload.url).toEqual(`?name=joe&page=1`)
          }
        }}
      >
        <PlayersSearch />
      </MakeWrapper>
    )

    const searchBox = getByRole('textbox')

    // pissble bu testing libaray not firing the key press
    fireEvent.keyPress(searchBox, { key: 'Enter', code: 'Enter' })
  })
})
