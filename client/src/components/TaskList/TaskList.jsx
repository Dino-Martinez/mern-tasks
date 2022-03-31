import React, { useEffect } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { Stack } from '@mantine/core'
import Task from '../Task/Task'

export default function TaskList () {
  const { arr, copy } = useArray([])
  const { loading, value } = useFetch('/api') // Add error handling

  useEffect(() => {
    if (!loading && value) { copy(value.payload) }
  }, [loading, value])

  return (
    <>
      {!loading && value &&
        <Stack>
          {arr.map(task => {
            return (
              <Task key={task._id} task={task} />
            )
          })}
        </Stack>}
    </>
  )
}
