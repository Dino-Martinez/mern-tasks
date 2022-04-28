/* eslint-disable react/jsx-handler-names */
import React from 'react'
import { ActionIcon, Group, Header, Menu, Title } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { Sun, Moon, User, Logout } from 'tabler-icons-react'
import useFetch from '../../hooks/useFetch'
import { func, oneOf } from 'prop-types'
import './Nav.css'

export default function Nav ({ theme, setTheme, setAuth }) {
  const [opened, handlers] = useDisclosure(false)
  const { get } = useFetch('/api/user')
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }
  const logOut = async () => {
    handlers.close()
    const result = await get('logout')
    setAuth(result.message !== 'Logged out')
  }
  return (
    <Header py='md' mb='lg'>
      <Group grow>
        <Title order={1}>Simple Task Manager</Title>
        <Group position='right'>
          <Menu
            opened={opened}
            onOpen={handlers.open}
            onClose={handlers.close}
            placement='center'
            gutter={0}
            withArrow
            control={
              <ActionIcon
                variant='hover'
                radius='lg'
                size='xl'
              >
                <User size={32} />
              </ActionIcon>
            }
          >
            <Menu.Label>User Options</Menu.Label>
            <Menu.Item
              onClick={toggleTheme}
              icon={
                <>
                  {theme === 'dark' &&
                    <Sun size={24} />}
                  {theme === 'light' &&
                    <Moon size={24} />}
                </>
                  }
            >Toggle Theme
            </Menu.Item>

            <Menu.Item
              onClick={logOut}
              icon={
                <Logout size={24} />
                  }
            >Log Out
            </Menu.Item>
          </Menu>
        </Group>
      </Group>
    </Header>
  )
}

Nav.propTypes = {
  theme: oneOf(['dark', 'light']),
  setTheme: func,
  setAuth: func
}
