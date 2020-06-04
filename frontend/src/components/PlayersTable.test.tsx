import React from 'react'
import { render } from '@testing-library/react'

import { MakeWrapper, players } from './helpers/jest_helpers'

import PlayersTable from './PlayersTable'

describe('PlayersTable', () => {
  it('should render as expeected', () => {
    const { getAllByRole } = render(
      <MakeWrapper state={{ players }}>
        <PlayersTable />
      </MakeWrapper>
    )

    expect(getAllByRole('columnheader').length).toEqual(15)
    expect(getAllByRole('row').length).toEqual(4)
  })

  describe('when no players are found', () => {
    it('should render no player message', () => {
      const { getByText } = render(
        <MakeWrapper state={{ players: [] }}>
          <PlayersTable />
        </MakeWrapper>
      )

      expect(
        getByText('No Players Found', { exact: false })
      ).toBeInTheDocument()
    })
  })
})
