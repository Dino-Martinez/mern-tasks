import { useEffect, useRef, useState } from 'react'

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json'
  },
  method: 'GET'
}

export default function useFetch (url, options = {}, dependencies = [], runOnMount = false) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState()
  const firstUpdate = useRef(!runOnMount)

  const refetch = (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    setLoading(true)
    return fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions })
      .then(res => res.json())
      .then(json => {
        setData(json)
        setLoading(false)
      }).catch(setError)
  }

  const post = (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    return fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions, method: 'POST' })
      .then(res => res.json())
      .then(json => {
        return json
      }).catch(setError)
  }

  const get = (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    return fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions })
      .then(res => res.json())
      .then(json => {
        return json
      }).catch(setError)
  }

  useEffect(() => {
    console.log(firstUpdate.current)
    if (!firstUpdate.current) refetch()
    if (firstUpdate.current) firstUpdate.current = false
  }, dependencies)

  return { data, loading, error, get, post }
}
