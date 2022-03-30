import { useState } from 'react'

const useArray = (initial) => {
  const [arr, setArr] = useState([...initial])

  const push = (item) => {
    setArr(prev => [...prev, item])
  }

  const filter = (callback) => {
    setArr(prev => prev.filter(callback))
  }

  const update = (index, newVal) => {
    setArr(prev => [
      ...prev.slice(0, index),
      newVal,
      ...prev.slice(index + 1)
    ])
  }

  const pop = () => {
    const [item] = arr.slice(-1)
    setArr(prev => prev.slice(0, -1))

    return item
  }

  const clear = () => {
    setArr([])
  }

  const copy = (_arr) => {
    setArr(_arr)
  }

  return { arr, push, pop, filter, update, copy, clear }
}

export default useArray
