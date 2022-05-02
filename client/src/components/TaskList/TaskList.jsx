import React, { useEffect, useState } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { Button, Loader, Modal, Stack, Text } from '@mantine/core'
import Task from '../Task/Task'
import CreationForm from '../CreationForm/CreationForm'
import { AlertTriangle } from 'tabler-icons-react'
import { showNotification } from '@mantine/notifications'

export default function TaskList () {
  const { arr, copy, push, filter, update } = useArray([])
  const { data, loading, error, post, get } = useFetch('/api', {}, [], true)
  const [opened, setOpened] = useState(false)

  useEffect(() => {
    if (!loading && data) {
      copy(data.payload)
    }
  }, [loading, data])

  const addTask = async values => {
    const result = await post('', { body: JSON.stringify(values) })
    push(result.payload)
    setOpened(false)
  }

  const removeTask = async id => {
    const result = await get(`${id}`, { method: 'DELETE' })
    if (result.payload.acknowledged) { filter(item => item._id !== id) }
  }

  const updateTask = async (id, value) => {
    const result = await get(`${id}`, { method: 'PUT', body: JSON.stringify({ status: value }) })
    if (result.payload) {
      const index = arr.findIndex(task => task._id === id)
      const old = arr.find(task => task._id === id)
      old.status = value
      update(index, old)
    }
  }

  useEffect(() => {
    if (error) {
      showNotification({
        title: 'Whoops!',
        message: `Something went wrong: ${error.message}`,
        styles: (theme) => ({
          root: {
            backgroundColor: theme.colors.red[9],
            '> .__mantine-ref-icon': { backgroundColor: 'transparent' }
          },

          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            '&:hover': { backgroundColor: theme.colors.red[8] }
          }
        }),
        icon: <AlertTriangle size={32} />,
        loading: false,
        autoClose: 4000
      })
    }
  }, [error])

  return (
    <>
      {loading && <Loader variant='bars' size='xl' />}

      {arr && !loading && !error &&
        <Stack sx={{ width: '100%' }}>
          {arr.map(task => {
            return (
              <Task key={task._id} task={task} onDelete={removeTask} onUpdate={updateTask} />
            )
          })}
          <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size='xl' mb='md' onClick={() => setOpened(true)}> <Text size='xl'>Create a Task</Text> </Button>
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
