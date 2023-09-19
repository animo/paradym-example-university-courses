'use client'

import Link from 'next/link'
import { useSelectedLayoutSegment } from 'next/navigation'

import { classNames } from '@/lib/utils'

const navigation = [
  { name: 'Overview', href: 'overview', current: false },
  { name: 'Courses', href: 'courses', current: false },
]

export default function NavigationItems() {
  const segment = useSelectedLayoutSegment()

  const filteredNavigationItems = navigation.map((n) => {
    return {
      ...n,
      current: n.href === segment,
    }
  })

  return (
    <div className="flex items-center space-x-4">
      {filteredNavigationItems.map((item) => (
        <Link
          key={item.name}
          href={`/${item.href}`}
          className={classNames(
            item.current ? 'bg-indigo-900 text-white' : 'text-gray-300 hover:bg-indigo-700 hover:text-white',
            'rounded-md px-3 py-2 text-sm font-medium duration-200'
          )}
          aria-current={item.current ? 'page' : undefined}
        >
          {item.name}
        </Link>
      ))}
    </div>
  )
}
