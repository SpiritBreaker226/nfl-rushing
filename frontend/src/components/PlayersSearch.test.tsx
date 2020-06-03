import React from 'react'

import { screen, render } from '@testing-library/react'

import PlayersSearch from './PlayersSearch'

describe('PlayersSearch', () => {
  it('renders players search', async () => {
    render(<PlayersSearch />)

    expect(screen.getByText('Search', { exact: false })).toBeInTheDocument()
  })
})
