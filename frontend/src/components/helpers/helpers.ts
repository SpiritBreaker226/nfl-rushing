import { Dispatch } from 'react'

import queryString from 'query-string'

import { PlayerQuery } from '../../types/PlayerQuery'
import { Types } from '../../types/Actions'

export interface SetParamsCallbackProps {
  params: PlayerQuery
  dispatch: Dispatch<any>
  url: string
}

const setParamsCallback = ({
  params,
  dispatch,
  url,
}: SetParamsCallbackProps) => {
  const currentURL = queryString.parseUrl(url)
  const query = { ...currentURL.query, ...params }
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

  dispatch({ type: Types.UpdateURL, payload: { url: newUrl } })
}

export { setParamsCallback }
