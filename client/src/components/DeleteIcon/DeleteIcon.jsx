import { ActionIcon } from '@mantine/core'
import { func } from 'prop-types'
import { X } from 'tabler-icons-react'
import React from 'react'

export default function DeleteIcon ({ onClick }) {
  return (
    <ActionIcon
      variant='hover'
      radius='xl'
      size='xl'
      onClick={onClick}
    >
      <X size={32} />
    </ActionIcon>
  )
}

DeleteIcon.propTypes = {
  onClick: func
}
