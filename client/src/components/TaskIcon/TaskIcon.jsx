import React from 'react'
import { ThemeIcon } from '@mantine/core'
import { CircleCheck, CircleMinus, CircleDashed } from 'tabler-icons-react'
import PropTypes from 'prop-types'

import './TaskIcon.css'

export default function TaskIcon ({ status }) {
  const sizes = { outer: 48, inner: 40 }
  return (
    <>
      {status === 'complete' &&
        <ThemeIcon color='teal' size={sizes.outer} radius='xl'>
          <CircleCheck size={sizes.inner} />
        </ThemeIcon>}

      {status === 'incomplete' &&
        <ThemeIcon color='red' size={sizes.outer} radius='xl'>
          <CircleMinus size={sizes.inner} />
        </ThemeIcon>}

      {status === 'in progress' &&
        <ThemeIcon color='yellow' size={sizes.outer} radius='xl'>
          <CircleDashed size={sizes.inner} className='rotate-clockwise' />
        </ThemeIcon>}
    </>
  )
}

TaskIcon.propTypes = {
  status: PropTypes.oneOf(['complete', 'incomplete', 'in progress'])
}
