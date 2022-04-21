import './App.css'
import React, { useState, useEffect } from 'react'
import { AppShell, Center, Container, MantineProvider } from '@mantine/core'
import TaskList from './components/TaskList/TaskList'
import useFetch from './hooks/useFetch'
import Nav from './components/Nav/Nav'
import { AuthContext } from './hooks/useAuth'
import LoginForm from './components/LoginForm/LoginForm'
function App () {
  const [theme, setTheme] = useState('dark')
  const { data, loading } = useFetch('/api')
  const [authenticated, setAuth] = useState(false)
  useEffect(() => {
    if (!loading && data) setAuth(data.payload)
  }, [data, loading])

  return (
    <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles>
      <AuthContext.Provider value={authenticated}>
        <Container size='sm'>
          <AppShell padding={0}>
            <Nav theme={theme} setTheme={setTheme} />
          </AppShell>
          <Center>
            {authenticated &&
              <TaskList />}
            {!authenticated &&
              <LoginForm />}
          </Center>
        </Container>
      </AuthContext.Provider>
    </MantineProvider>
  )
}

export default App
