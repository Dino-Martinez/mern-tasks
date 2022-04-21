import React, { useState } from 'react'
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { EyeOff, EyeCheck } from 'tabler-icons-react'
import useFetch from '../../hooks/useFetch'

export default function LoginForm () {
  const { post } = useFetch('/api/user')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const result = await post('/login', { body: JSON.stringify({ username, password }) })
    console.log(result)
  }
  const signUp = async () => {
    const result = await post('/sign-up', { body: JSON.stringify({ username, password }) })
    console.log(result)
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <Title order={1}>You must be logged in to use this site</Title>
      <TextInput placeholder='johnTheMan' label='Username' value={username} onChange={(e) => setUsername(e.currentTarget.value)} required />
      <PasswordInput
        placeholder='johnTheMan' label='Username' value={password} onChange={(e) => setPassword(e.currentTarget.value)} required visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />}
      />
      <Button onClick={login}>Log In</Button>
      <Button onClick={signUp}>Sign Up</Button>
    </Stack>
  )
}
