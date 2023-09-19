'use server'

import { revalidateTag } from 'next/cache'

import { ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID, VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID } from '@/constants'
import { updateCourseById } from '@/lib/data/courses'
import { Course } from '@/lib/data/types'
import { paradymFetch } from '@/lib/fetch'

export async function verifyCourseCredentialsWorkflow(course: string) {
  try {
    const response = await paradymFetch('/executions', {
      method: 'POST',
      body: JSON.stringify({
        workflowId: VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID,
        input: {
          course,
        },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { message: `There was an error. ${data.message}` }
    }

    return {
      result: data,
    }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}

export async function issueCourseCredentialWorkflow({
  studentNumber,
  name,
  course,
}: {
  studentNumber: string
  name: string
  course: string
}) {
  try {
    const response = await paradymFetch('/executions', {
      method: 'POST',
      body: JSON.stringify({
        workflowId: ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID,
        input: { name, course, studentNumber },
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      return { message: `There was an error. ${data.message}` }
    }

    return {
      result: data,
    }
  } catch (e) {
    console.log('error', e)
    return { message: 'There was an error.' }
  }
}

export async function getWorkflowExecution(executionId: string) {
  try {
    const response = await paradymFetch(`/executions/${executionId}`, {
      method: 'GET',
    })

    const data = await response.json()

    if (!response.ok) {
      return { message: `There was an error. ${data.message}` }
    }

    return {
      result: data,
    }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}

export async function updateCourse(id: string, updatedCourse: Partial<Course>) {
  await updateCourseById(id, updatedCourse)
  revalidateTag('/courses')
}
