import { ChevronRightIcon } from '@heroicons/react/24/solid'
import { Metadata } from 'next'
import Link from 'next/link'

import { getCourses } from '@/lib/data/courses'
import Container from '@/ui/Container'
import CourseStatusBadge from '@/ui/CourseStatusBadge'
import Title from '@/ui/Title'

export const metadata: Metadata = {
  title: 'Courses - Silicon University',
}

export default async function Courses() {
  const courses = await getCourses()

  return (
    <Container className="py-16">
      <Title variant="large">Courses</Title>
      <ul role="list" className="grid divide-y divide-gray-100">
        {courses.map((course) => (
          <Link key={course.id} href={`/courses/${course.id}`}>
            <li className="relative flex cursor-pointer justify-between gap-x-6 px-2 py-5 duration-200 hover:bg-gray-100">
              <div className="flex min-w-0 items-center gap-x-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={course.imageUrl} alt="Course image" />
                <p className="font-semibold leading-6 text-gray-900">{course.name}</p>
              </div>
              <div className="flex shrink-0 items-center gap-x-4">
                <CourseStatusBadge
                  isCompleted={course.isCompleted}
                  isEnrolled={course.isEnrolled}
                  isCredentialReceived={course.isCredentialReceived}
                />
                <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
              </div>
            </li>
          </Link>
        ))}
      </ul>
    </Container>
  )
}
