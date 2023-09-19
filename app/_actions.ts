'use server'

import { revalidateTag } from 'next/cache'

import { updateCourseById } from '@/lib/data/courses'
import { Course } from '@/lib/data/types'
import { paradymFetch } from '@/lib/fetch'

// Set the ID's of your created workflows
const ISSUE_COURSE_CREDENTIAL_WORKFLOW_ID = 'clmj6lojn000fs601sq3m5ibd'
const VERIFY_COURSE_CREDENTIALS_WORKFLOW_ID = 'clmkcx7ou002fs6011j5mm405'

export async function verifyCourseCredentialsWorkflow() {
  try {
    const response = await paradymFetch('/executions', {
      method: 'POST',
      body: JSON.stringify({
        workflowId: VERIFY_COURSE_CREDENTIALS_WORKFLOW_ID,
        input: {},
      }),
    })

    return {
      result: await response.json(),
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
        workflowId: ISSUE_COURSE_CREDENTIAL_WORKFLOW_ID,
        input: { name, course, studentNumber },
      }),
    })

    return {
      result: await response.json(),
    }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}

export async function getWorkflowExecution(executionId: string) {
  try {
    const response = await paradymFetch(`/executions/${executionId}`, {
      method: 'GET',
    })

    return { result: await response.json() }
  } catch (e) {
    return { message: 'There was an error.' }
  }
}

export async function updateCourse(id: string, updatedCourse: Partial<Course>) {
  await updateCourseById(id, updatedCourse)
  revalidateTag('/courses')
}
