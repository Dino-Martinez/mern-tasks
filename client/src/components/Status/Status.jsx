import React, { useState } from 'react'
import { ActionIcon, Menu, Radio, RadioGroup, Tooltip } from '@mantine/core'
import { CircleCheck, CircleMinus, CircleDashed } from 'tabler-icons-react'
import { oneOf, func } from 'prop-types'

import './Status.css'

export default function Status ({ status, onSelect }) {
  const [selected, setStatus] = useState(status)
  const select = (value) => {
    setStatus(value)
    onSelect(value)
  }

  const sizes = { outer: 48, inner: 40 }
  // Don't talk about it thx
  const color = status === 'complete' ? 'teal' : status === 'incomplete' ? 'red' : 'yellow'
  const className = status === 'in progress' ? 'rotate-clockwise' : ''
  const icon = status === 'complete' ? <CircleCheck size={sizes.inner} className={className} /> : status === 'incomplete' ? <CircleMinus size={sizes.inner} className={className} /> : <CircleDashed size={sizes.inner} className={className} />

  return (
    <>
      <Menu
        control={
          <Tooltip
            wrapLines
            withArrow
            position='left'
            placement='center'
            transition='rotate-left'
            label={status}
          >
            <ActionIcon color={color} size={sizes.outer} radius='xl'>
              {icon}
            </ActionIcon>
          </Tooltip>
        }
        placement='end'
      >
        <RadioGroup value={selected} onChange={select} label='Set Status'>
          <Radio value='incomplete' label='Incomplete' />
          <Radio value='complete' label='Complete' />
          <Radio value='in progress' label='In Progress' />
        </RadioGroup>

      </Menu>
    </>
  )
}

Status.propTypes = {
  status: oneOf(['complete', 'incomplete', 'in progress']),
  onSelect: func
}
