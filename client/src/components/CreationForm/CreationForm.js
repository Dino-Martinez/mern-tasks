import { Button, Select, Stack, TextInput } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import { useForm } from '@mantine/form'
import { func } from 'prop-types'
import React from 'react'

export default function CreationForm ({ onSubmit }) {
  const form = useForm({
    initialValues: {
      title: '',
      status: 'incomplete',
      dueDate: null
    }
    // Potential validation goes here
  })

  const selectOptions = [
    {
      value: 'incomplete',
      label: 'Incomplete'
    },
    {
      value: 'complete',
      label: 'Complete'
    },
    {
      value: 'in progress',
      label: 'In Progress'
    }
  ]

  return (
    <form onSubmit={form.onSubmit(onSubmit)}>
      <Stack>
        <TextInput placeholder='Clean my room' label='Title' required {...form.getInputProps('title')} />
        <Select label='Initial Status' data={selectOptions} required {...form.getInputProps('status', { type: 'select' })} />
        <DatePicker placeholder='Pick a date' label='Due Date' required {...form.getInputProps('dueDate', { type: 'date' })} />
        <Button variant='gradient' gradient={{ from: 'indigo', to: 'cyan', deg: 45 }} type='submit'>Create</Button>
      </Stack>
    </form>
  )
}

CreationForm.propTypes = {
  onSubmit: func
}
