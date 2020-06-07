import clsx from 'clsx'
import React, { FC, HTMLAttributes } from 'react'

import Container from '@/components/atoms/Container'

type Props = HTMLAttributes<HTMLDivElement> & {
  color?: 'dark' | 'primary'
  shadow?: boolean
}

const Hero: FC<Props> = ({ children, color, className, shadow, ...props }) => (
  <div
    className={clsx(
      'hero',
      {
        [`hero--${color}`]: !!color,
        'shadow--lw': shadow
      },
      className
    )}
    {...props}
  >
    <Container>{children}</Container>
  </div>
)

export default Hero