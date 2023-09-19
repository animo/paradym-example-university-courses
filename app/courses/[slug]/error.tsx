'use client'

import { ArrowRightIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { useEffect } from 'react'

import Container from '@/ui/Container'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

export default function Error({ error }: { error: Error }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <section>
      <Container className="grid place-items-center gap-4 pt-36 text-center">
        <Title>Course not found</Title>
        <Paragraph className="text-center">Unfortunately, we could not find the page you requested. </Paragraph>
        <Link href="/" className="font-medium text-gray-700">
          Return to home <ArrowRightIcon className="inline pl-1" height="14" />
        </Link>
      </Container>
    </section>
  )
}
