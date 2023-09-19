import Link from 'next/link'

import { Course } from '@/lib/data/types'
import CourseStatusBadge from '@/ui/CourseStatusBadge'

export default function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/courses/${course.id}`}>
      <div key={course.id} className="relative rounded-lg border bg-white duration-200 hover:bg-gray-100">
        <div className="absolute right-0 m-2 flex rounded-full bg-white px-2">
          <CourseStatusBadge
            isCompleted={course.isCompleted}
            isEnrolled={course.isEnrolled}
            isCredentialReceived={course.isCredentialReceived}
          />
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.imageUrl}
          alt={`Image for course ${course.name}`}
          className="h-56 w-full rounded-t-lg object-cover"
        />
        <div className="grid gap-2 p-4">
          <h2 className="font-medium">{course.name}</h2>
          <span>{course.subTitle}</span>
        </div>
      </div>
    </Link>
  )
}
