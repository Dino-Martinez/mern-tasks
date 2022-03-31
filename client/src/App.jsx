import './App.css'
import React, { useState } from 'react'
import { AppShell, Center, Container, MantineProvider } from '@mantine/core'
import TaskList from './components/TaskList/TaskList'
import Nav from './components/Nav/Nav'

function App () {
  const [theme, setTheme] = useState('dark')
  return (
    <MantineProvider theme={{ colorScheme: theme }} withGlobalStyles>
      <Container size='sm'>
        <AppShell padding={0}>
          <Nav theme={theme} setTheme={setTheme} />
        </AppShell>
        <Center>
          <TaskList />
        </Center>
      </Container>
    </MantineProvider>
  )
}

export default App
