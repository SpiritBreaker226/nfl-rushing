import React from 'react'
import { render, fireEvent } from '@testing-library/react'

import { MakeWrapper, players } from './helpers/jest_helpers'

import PlayersTable from './PlayersTable'
import { Types, Action } from '../types/Actions'

describe('PlayersTable', () => {
  it('should render as expeected', () => {
    const { queryByTestId, getAllByRole } = render(
      <MakeWrapper
        state={{
          players,
          pagination: { rows_per_page: 10, page_total: 2, current_page: '1' },
        }}
      >
        <PlayersTable />
      </MakeWrapper>
    )

    expect(getAllByRole('columnheader').length).toEqual(15)
    expect(getAllByRole('row').length).toEqual(4)
    expect(queryByTestId('pagination')).toBeInTheDocument()
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

  describe('for pagination', () => {
    it('should not render pagination on a single page', () => {
      const { queryByTestId } = render(
        <MakeWrapper
          state={{
            players,
            pagination: { rows_per_page: 10, page_total: 1, current_page: '1' },
          }}
        >
          <PlayersTable />
        </MakeWrapper>
      )

      expect(queryByTestId('pagination')).not.toBeInTheDocument()
    })

    it('should switch to another page on click on click', () => {
      const { getByRole } = render(
        <MakeWrapper
          state={{
            players,
            pagination: {
              rows_per_page: 10,
              page_total: 2,
              current_page: '1',
            },
          }}
          dispatch={(action: Action) => {
            if (action.type === Types.UpdateURL) {
              expect(action.payload.params.page).toEqual('2')
            }
          }}
        >
          <PlayersTable />
        </MakeWrapper>
      )

      fireEvent.click(getByRole('button', { name: 'Go to page 2' }))
    })
  })
})
