import React from 'react'
import { ActionIcon, Button, Group, Header, Menu, Title } from '@mantine/core'
import { Sun, Moon, User } from 'tabler-icons-react'
import useFetch from '../../hooks/useFetch'
import { func, oneOf } from 'prop-types'
import './Nav.css'

export default function Nav ({ theme, setTheme }) {
  const { get } = useFetch('/api/user')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const logOut = async () => {
    const result = await get('/logout')
    console.log(result)
  }
  return (
    <Header py='md' mb='lg'>
      <Group grow>
        <Title order={1}>Simple Task Manager</Title>
        <Group position='right'>
          <Menu control={
            <ActionIcon
              variant='hover'
              radius='lg'
              size='xl'
            >
              <User size={32} />
            </ActionIcon>
            }
          >
            <Group grow>
              <Button
                variant='subtle'
                onClick={toggleTheme}
                leftIcon={
                  <>
                    {theme === 'dark' &&
                      <Sun size={32} />}
                    {theme === 'light' &&
                      <Moon size={32} />}
                  </>
                  }
              >Toggle Theme
              </Button>
            </Group>

            <Group grow>
              <Button
                variant='subtle'
                onClick={logOut}
                leftIcon={
                  <>
                    {theme === 'dark' &&
                      <Sun size={32} />}
                    {theme === 'light' &&
                      <Moon size={32} />}
                  </>
                  }
              >Log Out
              </Button>
            </Group>
          </Menu>
        </Group>
      </Group>
    </Header>
  )
}

Nav.propTypes = {
  theme: oneOf(['dark', 'light']),
  setTheme: func
}
