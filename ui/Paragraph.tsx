import type { PropsWithChildren } from 'react'

import clsx from 'clsx'

interface ParagraphProps {
  className?: string
}

export default function Paragraph({ className, ...props }: PropsWithChildren<ParagraphProps>) {
  return <p className={clsx('text-sm text-gray-700 sm:text-base', className)} {...props} />
}
