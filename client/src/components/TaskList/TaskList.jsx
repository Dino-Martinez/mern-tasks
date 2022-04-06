import React, { useEffect, useState } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { Button, Modal, Stack, Text } from '@mantine/core'
import Task from '../Task/Task'
import CreationForm from '../CreationForm/CreationForm'

export default function TaskList () {
  const { arr, copy, push, filter } = useArray([])
  const { data, loading, error, post, get } = useFetch('/api') // Add error handling
  const [opened, setOpened] = useState(false)
  useEffect(() => {
    if (!loading && data) {
      copy(data.payload)
    }
  }, [loading, data])

  const addTask = async values => {
    const result = await post('', { body: JSON.stringify(values) })
    push(result.payload)
  }

  const removeTask = async id => {
    const result = await get(`/${id}`, { method: 'DELETE' })
    console.log(result)
    if (result.payload.acknowledged) { filter(item => item._id !== id) }
  }

  return (
    <>
      {error && 'Error'}
      {!loading && data &&
        <Stack sx={{ width: '100%' }}>
          {arr.map(task => {
            return (
              <Task key={task._id} task={task} onDelete={removeTask} />
            )
          })}
          <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size='xl' onClick={() => setOpened(true)}> <Text size='xl'>Create a Task</Text> </Button>
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
