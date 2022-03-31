import { Header, Text, Title } from '@mantine/core'
import React from 'react'
import './Nav.css'

export default function Nav () {
  return (
    <Header py='md' mb='lg'>
      <Title order={1}>Simple Task Manager</Title>
      <Text size='lg'>Built with the MERN Stack</Text>
    </Header>
  )
}
