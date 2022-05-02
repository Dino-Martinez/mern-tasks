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

  const refetch = async (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    setLoading(true)
    try {
      const res = await fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions })
      const json = await res.json()

      if (res.status > 399) throw new Error(json.message)
      setData(json)
      setLoading(false)
    } catch (error) {
      setError(error)
    }
  }

  const post = async (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    try {
      const res = await fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions, method: 'POST' })
      const json = await res.json()

      if (res.status > 399) throw new Error(json.message)
      return json
    } catch (error) {
      setError(error)
      return 'Failure'
    }
  }

  const get = async (route = '', newOptions = {}) => {
    const urlRoute = `${url}/${route}`
    try {
      const res = await fetch(urlRoute, { ...DEFAULT_OPTIONS, ...options, ...newOptions })
      const json = await res.json()

      if (res.status > 399) throw new Error(json.message)
      return json
    } catch (error) {
      setError(error)
      return 'Failure'
    }
  }

  useEffect(() => {
    if (!firstUpdate.current) refetch()
    if (firstUpdate.current) firstUpdate.current = false
  }, dependencies)

  return { data, loading, error, get, post }
}
