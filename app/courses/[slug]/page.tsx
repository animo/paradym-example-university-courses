import BackLink from '@/app/components/BackLink'
import CourseCompleteButton from '@/app/components/CourseCompleteButton'
import EnrollCourse from '@/app/components/EnrollCourse'
import ReceiveCredential from '@/app/components/ReceiveCredential'
import { getCourseById } from '@/lib/data/courses'
import { getStudent } from '@/lib/data/student'
import Container from '@/ui/Container'
import Markdown from '@/ui/Markdown'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const course = await getCourseById(params.slug)

  if (course)
    return {
      title: `${course.name} - Silicon University`,
    }
}

export default async function Course({ params }: { params: { slug: string } }) {
  const course = await getCourseById(params.slug)
  const student = await getStudent()

  if (!course) throw new Error('Course not found.')

  return (
    <Container className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="flex flex-col gap-6 border-r py-16 pr-6">
        <BackLink />
        <div className="grid gap-4">
          <Title variant="medium">{course.name}</Title>
          <Paragraph>{course.subTitle}</Paragraph>
        </div>
        <div>
          <Title variant="small">Required credentials</Title>
          <ul>
            {course.requiredCredentials.length > 0 ? (
              course.requiredCredentials.map((c) => (
                <li key={c.name}>
                  <Paragraph className="inline">
                    <span className="pr-2 font-bold">•</span>
                    {c.name}
                  </Paragraph>
                </li>
              ))
            ) : (
              <span className="text-sm">None</span>
            )}
          </ul>
        </div>
        {course.isEnrolled ? <ReceiveCredential student={student} course={course} /> : <EnrollCourse course={course} />}
      </div>

      <article className="prose grid py-16 md:col-span-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={course.imageUrl}
          alt={`Image for course ${course.name}`}
          className="h-72 w-full rounded object-cover"
        />
        <Markdown>{course.content}</Markdown>
        {course.isEnrolled && (
          <div className="grid pt-8">
            <CourseCompleteButton course={course} />
          </div>
        )}
      </article>
    </Container>
  )
}
