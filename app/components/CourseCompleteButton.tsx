'use client'

import { updateCourse } from '@/app/_actions'
import { Course } from '@/lib/data/types'
import Button from '@/ui/Button'

export default function CourseCompleteButton({ course }: { course: Course }) {
  async function onComplete() {
    await updateCourse(course.id, { isCompleted: true })
  }

  return (
    <Button onClick={onComplete} disabled={course.isCompleted}>
      Complete course
    </Button>
  )
}
