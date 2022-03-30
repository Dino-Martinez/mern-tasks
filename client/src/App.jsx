import './App.css'
import React, { useEffect } from 'react'
import useArray from './hooks/useArray'
import useFetch from './hooks/useFetch'
function App () {
  const { arr, copy } = useArray([])
  const { loading, value } = useFetch('/api') // Add error handling

  useEffect(() => {
    if (!loading && value) { copy(value.payload) }
  }, [loading, value])

  return (
    <div>
      {!loading && value &&
        <ul>
          {arr.map(task => <li key={task._id}>{task.title} - {task.status}</li>)}
        </ul>}
    </div>
  )
}

export default App
