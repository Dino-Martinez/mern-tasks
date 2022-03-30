import { useState, useCallback, useEffect } from 'react'

const useAsync = (callback, dependencies = []) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const [value, setValue] = useState()

  const callbackMemo = useCallback(() => {
    setLoading(true)
    setError(undefined)
    setValue(undefined)
    callback()
      .then(setValue)
      .catch(setError)
      .finally(setLoading(false))
  }, dependencies)

  useEffect(() => {
    callbackMemo()
  }, [callbackMemo])

  return { loading, error, value }
}

export default useAsync
