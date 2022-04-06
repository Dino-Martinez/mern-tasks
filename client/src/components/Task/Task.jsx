import React from 'react'
import { Card, Title, Text, Group, Stack, Center, Tooltip } from '@mantine/core'
import { shape, string, oneOf, func } from 'prop-types'
import TaskIcon from '../TaskIcon/TaskIcon'
import './Task.css'
import DeleteIcon from '../DeleteIcon/DeleteIcon'

export default function Task ({ task, onDelete }) {
  const onClick = () => {
    onDelete(task._id)
  }
  return (
    <Card shadow='md' p='lg'>
      <Group position='apart'>
        <Group position='left'>
          <Tooltip
            wrapLines
            withArrow
            position='left'
            placement='center'
            transition='rotate-left'
            label={task.status}
          >
            <TaskIcon status={task.status} />
          </Tooltip>
          <Stack>
            {!task.dueDate &&
              <Center sx={{ height: '100%' }}>
                <Title component='span' order={2}> {task.title}</Title>
                <Text size='xl'>{task.dueDate}</Text>
              </Center>}
            {task.dueDate &&
              <>
                <Title component='span' order={2}> {task.title}</Title>
                <Text size='xl'>{task.dueDate}</Text>
              </>}
          </Stack>
        </Group>
        <DeleteIcon onClick={onClick} />
      </Group>
    </Card>
  )
}

Task.propTypes = {
  task: shape({
    status: oneOf(['complete', 'incomplete', 'in progress']),
    title: string,
    dueDate: string
  }),
  onDelete: func
}
