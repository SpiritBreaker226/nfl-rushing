import { Player } from './Players'

export interface InitialState {
  players: Player[]
  urlToPlayersEndpoint: string
  search: string
  errorMessage: string
  isLoading: boolean
}

export enum Types {
  UpdatePlayers = 'UPDATE_PLAYERS',
  UpdateURL = 'UPDATE_URL',
  UpdateSearch = 'UPDATE_SEARCH',
  UpdateLoading = 'UPDATE_LOADING',
  UpdateErrorMessageFromServer = 'UPDATE_ERROR_MESSAGE_FROM_SERVER',
}

interface PlayersPayload {
  [Types.UpdatePlayers]: {
    players: Player[]
    isLoading: boolean
  }
}

interface CallingServerPayload {
  [Types.UpdateURL]: {
    url: string
  }
  [Types.UpdateLoading]: {
    isLoading: boolean
  }
  [Types.UpdateErrorMessageFromServer]: {
    errorMessage: string
    isLoading: boolean
  }
}

interface SearchPayload {
  [Types.UpdateSearch]: {
    search: string
  }
}

type ActionMap<M extends { [index: string]: any }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key
      }
    : {
        type: Key
        payload: M[Key]
      }
}

export type PlayersActions = ActionMap<PlayersPayload>[keyof ActionMap<
  PlayersPayload
>]

export type CallingServerActions = ActionMap<
  CallingServerPayload
>[keyof ActionMap<CallingServerPayload>]

export type SearchActions = ActionMap<SearchPayload>[keyof ActionMap<
  SearchPayload
>]

export type Action = PlayersActions | CallingServerActions | SearchActions
