import type { PropsWithChildren } from 'react'

import { clsx } from 'clsx'

interface ContainerProps {
  className?: string
}

export default function Container({ className, ...props }: PropsWithChildren<ContainerProps>) {
  return <div className={clsx('mx-auto max-w-7xl px-4 sm:px-6 lg:px-8', className)} {...props} />
}
