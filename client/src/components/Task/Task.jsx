import React from 'react'
import { Card, Title, Text, Group, Stack, Center } from '@mantine/core'
import { shape, string, oneOf, func } from 'prop-types'
import Status from '../Status/Status'
import './Task.css'
import DeleteIcon from '../DeleteIcon/DeleteIcon'

export default function Task ({ task, onDelete, onUpdate }) {
  const onClick = () => {
    onDelete(task._id)
  }
  const onSelect = value => {
    onUpdate(task._id, value)
  }
  return (
    <Card shadow='md' p='lg'>
      <Group position='apart'>
        <Group position='left'>
          <Status status={task.status} onSelect={onSelect} />
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
  onDelete: func,
  onUpdate: func
}
