import React from 'react'
import { Card, Title, Text, Group, Stack } from '@mantine/core'
import { shape, string, oneOf } from 'prop-types'
import TaskIcon from '../TaskIcon/TaskIcon'
import './Task.css'

export default function Task ({ task }) {
  return (
    <Card shadow='md' p='lg'>
      <Group>
        <TaskIcon status={task.status} />
        <Stack>
          <Title component='span' order={2}> {task.title} - {task.status}</Title>
          <Text size='xl'>{task.dueDate}</Text>
        </Stack>
      </Group>
    </Card>
  )
}

Task.propTypes = {
  task: shape({
    status: oneOf(['complete', 'incomplete', 'in progress']),
    title: string,
    dueDate: string
  })
}
