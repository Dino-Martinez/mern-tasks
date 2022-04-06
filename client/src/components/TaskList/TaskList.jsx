import React, { useEffect, useState } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { Button, Modal, Stack } from '@mantine/core'
import Task from '../Task/Task'
import CreationForm from '../CreationForm/CreationForm'

export default function TaskList () {
  const { arr, copy, push } = useArray([])
  const { data, loading, error, post } = useFetch('/api') // Add error handling
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!loading && data) { copy(data.payload) }
  }, [loading, data])

  const addTask = async values => {
    const result = await post('', { body: JSON.stringify(values) })
    push(result.payload)
  }

  return (
    <>
      {error && 'Error'}
      {!loading && data &&
        <Stack>
          {arr.map(task => {
            return (
              <Task key={task._id} task={task} />
            )
          })}
          <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} onClick={() => setOpened(true)}>Create a Task</Button>
          <Modal
            centered
            opened={opened}
            onClose={() => setOpened(false)}
            title='Create a Task'
          >
            <CreationForm onSubmit={addTask} />
          </Modal>
        </Stack>}
    </>
  )
}
