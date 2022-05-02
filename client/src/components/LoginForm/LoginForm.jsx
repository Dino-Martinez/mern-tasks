import React, { useEffect, useState } from 'react'
import { Button, PasswordInput, Stack, TextInput, Title } from '@mantine/core'
import { EyeOff, EyeCheck, AlertTriangle } from 'tabler-icons-react'
import useFetch from '../../hooks/useFetch'
import { func } from 'prop-types'
import { showNotification } from '@mantine/notifications'
export default function LoginForm ({ setAuth }) {
  const { error, post } = useFetch('/api/user')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = async () => {
    const result = await post('login', { body: JSON.stringify({ username, password }) })
    setAuth(result.message === 'Logged in')
  }
  const signUp = async () => {
    const result = await post('sign-up', { body: JSON.stringify({ username, password }) })
    setAuth(result.message === 'Logged in')
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
    <Stack sx={{ width: '100%' }}>
      <Title order={1}>You must be logged in to use this site</Title>
      <TextInput placeholder='johnTheMan' label='Username' value={username} onChange={(e) => setUsername(e.currentTarget.value)} required />
      <PasswordInput
        placeholder='johnTheMan' label='Password' value={password} onChange={(e) => setPassword(e.currentTarget.value)} required visibilityToggleIcon={({ reveal, size }) =>
          reveal ? <EyeOff size={size} /> : <EyeCheck size={size} />}
      />
      <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size='xl' onClick={login}>Log In</Button>
      <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} size='xl' onClick={signUp}>Sign Up</Button>
    </Stack>
  )
}

LoginForm.propTypes = {
  setAuth: func
}
