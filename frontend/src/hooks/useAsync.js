import { useCallback, useEffect, useState } from 'react'

const useAsync = (func, dependencies = [], immediate = true) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [data, setData] = useState()

  const execute = useCallback((...params) => {
    setLoading(true)
    return func(...params)
      .then(({ data }) => {
        setData(data)
        setError(undefined)
        return data
      })
      .catch((error) => {
        setError(error.response?.data?.message || error?.message || error)
        setData(undefined)
        return Promise.reject(error.response?.data?.message || error?.message || error)
      })
      .finally(() => {
        setLoading(false)
      })
  }, dependencies)

  useEffect(() => {
    if (immediate) {
      execute()
    }
  }, [execute, immediate])

  return { loading, error, data, execute }
}

export default useAsync
