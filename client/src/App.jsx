import './App.css'
import React from 'react'
import { Center, Container } from '@mantine/core'
import TaskList from './components/TaskList/TaskList'

function App () {
  return (
    <Container size='sm'>
      <Center>
        <TaskList />
      </Center>
    </Container>
  )
}

export default App
