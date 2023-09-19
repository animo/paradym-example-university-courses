import type { PropsWithChildren } from 'react'

import { clsx } from 'clsx'

const baseStyle = 'py-2 font-medium tracking-tight'

const variants = {
  small: 'text-base',
  normal: 'text-xl',
  medium: 'text-3xl',
  large: 'text-4xl',
}

interface TitleProps {
  variant?: 'small' | 'normal' | 'medium' | 'large'
  className?: string
}

export default function Title({ variant = 'normal', className, ...props }: PropsWithChildren<TitleProps>) {
  className = clsx(baseStyle, variants[variant], className)

  return <h1 className={className} {...props} />
}
