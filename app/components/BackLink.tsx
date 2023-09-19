'use client'

import { useRouter } from 'next/navigation'

export default function BackLink() {
  const { back } = useRouter()

  return (
    <button onClick={() => back()} className="flex text-gray-600 duration-200 hover:opacity-80">
      {'<-'} Back to courses
    </button>
  )
}
