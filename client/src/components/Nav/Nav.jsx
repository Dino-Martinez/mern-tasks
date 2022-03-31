import { ActionIcon, Center, Group, Header, Title } from '@mantine/core'
import { Sun, Moon } from 'tabler-icons-react'
import React from 'react'
import { func, oneOf } from 'prop-types'
import './Nav.css'

export default function Nav ({ theme, setTheme }) {
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  return (
    <Header py='md' mb='lg'>
      <Group grow>
        <Title order={1}>Simple Task Manager</Title>
        <Group position='right'>
          <Center>
            <ActionIcon
              variant='hover'
              radius='lg'
              size='xl'
              onClick={toggleTheme}
            >
              {theme === 'dark' &&
                <Sun size={32} />}
              {theme === 'light' &&
                <Moon size={32} />}
            </ActionIcon>
          </Center>
        </Group>
      </Group>
    </Header>
  )
}

Nav.propTypes = {
  theme: oneOf(['dark', 'light']),
  setTheme: func
}
