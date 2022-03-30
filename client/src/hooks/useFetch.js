import useAsync from './useAsync'

const DEFAULT_OPTIONS = {
  headers: { 'Content-Type': 'application/json' },
  method: 'GET'
}
const useFetch = (url, options = {}, dependencies = []) => {
  return useAsync(async () => {
    const res = await fetch(url, { ...DEFAULT_OPTIONS, ...options })
    return res.ok ? res.json() : res.json().then(json => Promise.reject(json))
  }, dependencies)
}

export default useFetch
