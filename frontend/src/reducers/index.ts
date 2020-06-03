import { Types, InitialState, Action } from '../types/Actions'

export const playersReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdatePlayers:
      return {
        ...state,
        isLoading: action.payload.isLoading,
        players: action.payload.players || [],
      }
    default:
      return state
  }
}

export const callingServerReducer = (state: InitialState, action: Action) => {
  switch (action.type) {
    case Types.UpdateURL:
      return { ...state, urlToPlayersEndpoint: action.payload.url }
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
    default:
      return state
  }
}

export default { playersReducer, callingServerReducer, searchReducer }
