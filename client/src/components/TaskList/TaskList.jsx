import React, { useEffect } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { List, Text } from '@mantine/core'
import TaskIcon from '../TaskIcon/TaskIcon'

export default function TaskList () {
  const { arr, copy } = useArray([])
  const { loading, value } = useFetch('/api') // Add error handling

  useEffect(() => {
    if (!loading && value) { copy(value.payload) }
  }, [loading, value])

  return (
    <>
      {!loading && value &&
        <List center>
          {arr.map(task => {
            return (
              <List.Item
                key={task._id}
                icon={
                  <TaskIcon status={task.status} />
                }
              >
                <Text component='span' size='xl'>{task.title} - {task.status}</Text>
              </List.Item>
            )
          })}
        </List>}
    </>
  )
}
