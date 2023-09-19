import type { PropsWithChildren } from 'react'

import { clsx } from 'clsx'
import ReactMarkdown from 'react-markdown'

const baseStyle =
  'prose prose-h1:text-2xl prose-h2:text-lg prose-h3:text-base prose-h1:font-semibold prose-h2:font-medium'

interface MarkdownProps {
  className?: string
}

export default function Markdown({ className, ...props }: PropsWithChildren<MarkdownProps>) {
  className = clsx(baseStyle, className)

  if (typeof props.children !== 'string') {
    return null
  }

  return <ReactMarkdown className={className}>{props.children}</ReactMarkdown>
}
