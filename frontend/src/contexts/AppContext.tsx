import React, {
  FunctionComponent,
  createContext,
  Dispatch,
  useReducer,
} from 'react'

import { InitialState, Action } from '../types/Actions'

import {
  playersReducer,
  callingServerReducer,
  searchReducer,
} from '../reducers'

const initialState: InitialState = {
  players: [],
  urlToPlayersEndpoint: `${process.env.REACT_APP_BASE_API_URL}/players`,
  search: '',
  errorMessage: '',
  isLoading: true,
}

const AppContext = createContext<{
  state: InitialState
  dispatch: Dispatch<any>
}>({
  state: initialState,
  dispatch: () => null,
})

const mainReducer = (state: InitialState, action: Action) => {
  // TODO: FInd a Way to only use the reducer for the action of that reducer
  // to reduce time complexity
  let courrentState = playersReducer(state, action)

  courrentState = callingServerReducer(courrentState, action)

  return searchReducer(courrentState, action)
}

const AppProvider: FunctionComponent = ({ children }) => {
  const [state, dispatch] = useReducer(mainReducer, initialState)

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export { AppContext, AppProvider }
