import { Metadata } from 'next'
import Link from 'next/link'

import { getCourses } from '@/lib/data/courses'
import { getStudent } from '@/lib/data/student'
import Container from '@/ui/Container'
import CourseCard from '@/ui/CourseCard'
import Title from '@/ui/Title'

export const metadata: Metadata = {
  title: 'Overview - Silicon University',
}

export default async function Home() {
  const student = await getStudent()
  const courses = (await getCourses()).filter((c) => c.isEnrolled)

  return (
    <Container className="py-16">
      <Title className="mb-8" variant="large">
        Welcome, {student.name}!
      </Title>
      <div className="grid gap-8">
        <div>
          <Title>My Courses</Title>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {courses.length !== 0 ? (
              courses.map((c) => <CourseCard key={c.id} course={c} />)
            ) : (
              <div className="col-span-3 mt-24 text-center">
                You do not have any active courses.{' '}
                <Link className="font-medium" href="/courses">
                  View courses {'->'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
