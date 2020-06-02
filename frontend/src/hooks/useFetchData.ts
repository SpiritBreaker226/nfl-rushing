import { useState, useEffect } from 'react'

import axios, { AxiosStatic } from 'axios'

export interface UseFetchDataProps {
  url: string
  req?: AxiosStatic
}

const useFetchData = ({ url, req = axios }: UseFetchDataProps) => {
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true)

        const res = await req.get(url)

        setData(res.data.data)
        setIsLoading(false)
      } catch (error) {
        setErrorMessage(error.message)
        setIsLoading(false)
      }
    }

    fetchData()
  }, [url])

  return {
    isLoading,
    data,
    errorMessage,
  }
}

export default useFetchData
