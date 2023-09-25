import crypto from 'crypto'

import {
  ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID,
  PARADYM_WEBHOOK_SECRET,
  VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID,
} from '@/constants'
import { updateCourseById } from '@/lib/data/courses'
import { paradymFetch } from '@/lib/fetch'

export async function POST(request: Request) {
  try {
    const rawBody = await request.text()
    const rawBodyBuffer = Buffer.from(rawBody, 'utf-8')
    const bodySignature = sha256(rawBodyBuffer, PARADYM_WEBHOOK_SECRET)

    if (bodySignature !== request.headers.get('X-Paradym-HMAC-SHA-256')) {
      return Response.json({
        code: 'invalid_signature',
        error: "signature didn't match",
      })
    }

    const json = JSON.parse(rawBodyBuffer.toString('utf-8'))

    const workflowExecutionId = json.payload.workflowExecutionId
    const workflowId = json.payload.workflowId

    if (json.eventType === 'workflowExecution.completed') {
      if (workflowId === VERIFY_COURSE_CERTIFICATE_WORKFLOW_ID) {
        const response = await paradymFetch(`/executions/${workflowExecutionId}`, {
          method: 'GET',
        })
        const { payload } = await response.json()
        await updateCourseById(payload.input.courseId, { isEnrolled: true })
      }
      if (workflowId === ISSUE_COURSE_CERTIFICATE_WORKFLOW_ID) {
        const response = await paradymFetch(`/executions/${workflowExecutionId}`, {
          method: 'GET',
        })
        const { payload } = await response.json()
        await updateCourseById(payload.input.courseId, { isCredentialReceived: true })
      }
    }

    return new Response('Webhook request validated', {
      status: 200,
    })
  } catch (error) {
    console.error('e', error)
  }
}

function sha256(data: Buffer, secret: string): string {
  return crypto.createHmac('sha256', secret).update(data).digest('hex')
}
