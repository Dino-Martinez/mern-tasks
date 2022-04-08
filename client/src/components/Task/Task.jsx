import React from 'react'
import { Card, Title, Text, Group, Stack } from '@mantine/core'
import date from 'date-and-time'
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
  const parseDueDate = () => {
    const today = new Date()
    const due = new Date(task.dueDate)
    const difference = date.subtract(due, today).toDays()
    if (difference < -1) return `Due ${-Math.floor(difference)} Days Ago`
    if (difference < 0) return 'Due Yesterday'
    if (difference > 1) return `Due In ${Math.ceil(difference)} Days`
    return 'Due Today'
  }

  return (
    <Card shadow='md' p='lg'>
      <Group position='apart'>
        <Group position='left' sx={{ flexWrap: 'nowrap', flex: 1 }}>
          <Status status={task.status} onSelect={onSelect} />
          <Stack>
            <Title order={3}> {task.title}</Title>
            {task.dueDate &&
              <Text size='xl'>{parseDueDate()}</Text>}
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
