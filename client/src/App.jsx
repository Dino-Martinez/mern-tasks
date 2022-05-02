import './App.css'
import React, { useState, useEffect } from 'react'
import { AppShell, Center, Container, MantineProvider } from '@mantine/core'
import TaskList from './components/TaskList/TaskList'
import useFetch from './hooks/useFetch'
import Nav from './components/Nav/Nav'
import { AuthContext } from './hooks/useAuth'
import LoginForm from './components/LoginForm/LoginForm'
import { NotificationsProvider } from '@mantine/notifications'
function App () {
  const [theme, setTheme] = useState('dark')
  const { data, loading } = useFetch('/api/user', {}, [], true)
  const [authenticated, setAuth] = useState(false)
  useEffect(() => {
    if (!loading && data) setAuth(data.payload)
  }, [data, loading])

  return (
    <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles>
      <NotificationsProvider position='top-center'>
        <AuthContext.Provider value={authenticated}>
          <Container size='sm'>
            <AppShell padding={0}>
              <Nav theme={theme} setTheme={setTheme} setAuth={setAuth} />
            </AppShell>
            <Center>
              {authenticated &&
                <TaskList />}
              {!authenticated &&
                <LoginForm setAuth={setAuth} />}
            </Center>
          </Container>
        </AuthContext.Provider>
      </NotificationsProvider>
    </MantineProvider>
  )
}

export default App
