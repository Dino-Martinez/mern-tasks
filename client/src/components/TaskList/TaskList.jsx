import React, { useEffect, useState } from 'react'
import useArray from '../../hooks/useArray'
import useFetch from '../../hooks/useFetch'
import { Alert, Button, Loader, Modal, PasswordInput, Stack, Text, TextInput, Title } from '@mantine/core'
import Task from '../Task/Task'
import CreationForm from '../CreationForm/CreationForm'
import { AlertTriangle, EyeOff, EyeCheck } from 'tabler-icons-react'

export default function TaskList () {
  const { arr, copy, push, filter, update } = useArray([])
  const { data, loading, error, post, get } = useFetch('/api')
  const [loggedIn, setLoggedIn] = useState(false)
  const [opened, setOpened] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (!loading && data) {
      console.log(data)
      if (data.payload === 'User not logged in' || !data.payload) { return setLoggedIn(false) }
      setLoggedIn(true)
      copy(data.payload)
    }
  }, [loading, data])

  const addTask = async values => {
    const result = await post('', { body: JSON.stringify(values) })
    push(result.payload)
    setOpened(false)
  }

  const removeTask = async id => {
    const result = await get(`/${id}`, { method: 'DELETE' })
    if (result.payload.acknowledged) { filter(item => item._id !== id) }
  }

  const updateTask = async (id, value) => {
    const result = await get(`/${id}`, { method: 'PUT', body: JSON.stringify({ status: value }) })
    if (result.payload) {
      const index = arr.findIndex(task => task._id === id)
      const old = arr.find(task => task._id === id)
      old.status = value
      update(index, old)
    }
  }

  const login = async () => {
    const result = await post('/user/login', { body: JSON.stringify({ username, password }) })
    console.log(result)
  }
  const signUp = async () => {
    const result = await post('/user/sign-up', { body: JSON.stringify({ username, password }) })
    console.log(result)
  }
  const logOut = async () => {
    const result = await get('/user/logout')
    console.log(result)
  }

  return (
    <>
      {error && <Alert icon={<AlertTriangle size={32} />} title='Whoops!' color='red' variant='filled' radius='md'>Something went wrong! Try refreshing.</Alert>}
      {loading && <Loader variant='bars' size='xl' />}
      {!loggedIn &&
        <Stack sx={{ width: '100%' }}>
          <Title order={1}>You must be logged in to use this site</Title>
          <TextInput placeholder='johnTheMan' label='Username' value={username} onChange={(e) => setUsername(e.currentTarget.value)} required />
          <PasswordInput
            placeholder='johnTheMan' label='Username' value={password} onChange={(e) => setPassword(e.currentTarget.value)} required visibilityToggleIcon={({ reveal, size }) =>
              reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />}
          />
          <Button onClick={login}>Log In</Button>
          <Button onClick={signUp}>Sign Up</Button>
        </Stack>}
      {arr && loggedIn &&
        <Stack sx={{ width: '100%' }}>
          <Button onClick={logOut}>Log Out</Button>
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
