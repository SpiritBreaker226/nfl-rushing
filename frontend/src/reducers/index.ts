import queryString from 'query-string'

import { Types, InitialState, Action } from '../types/Actions'

export const playersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdatePlayers:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        players: action.payload.players || [],
        pagination: action.payload.pagination,
      }
    default:
      return state
  }
}

export const callingServerReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateURL:
      const currentURL = queryString.parseUrl(state.urlToPlayersEndpoint)
      const query = { ...currentURL.query, ...action.payload.params }
      const newUrl = queryString.stringifyUrl(
        {
          url: currentURL.url,
          query,
        },
        {
          skipEmptyString: true,
          skipNull: true,
        }
      )

      return { ...state, urlToPlayersEndpoint: newUrl }
    case Types.UpdateLoading:
      return { ...state, isLoading: action.payload.isLoading }
    case Types.UpdateErrorMessageFromServer:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        errorMessage: action.payload.errorMessage,
      }
    default:
      return state
  }
}

export const searchReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateSearch:
      return {
        ...state,
        search: action.payload.search,
      }
    case Types.UpdateSorting:
      return {
        ...state,
        sorting: action.payload.sorting,
      }
    default:
      return state
  }
}

export default { playersReducer, callingServerReducer, searchReducer }
