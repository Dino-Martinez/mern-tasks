import './App.css'
import React from 'react'
import { AppShell, Center, Container, MantineProvider } from '@mantine/core'
import TaskList from './components/TaskList/TaskList'
import Nav from './components/Nav/Nav'

function App () {
  return (
    <MantineProvider theme={{ colorScheme: 'dark' }} withGlobalStyles>
      <Container size='sm'>
        <AppShell padding={0}>
          <Nav />
        </AppShell>
        <Center>
          <TaskList />
        </Center>
      </Container>
    </MantineProvider>
  )
}

export default App
