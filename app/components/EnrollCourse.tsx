'use client'

import { NoSymbolIcon, ShieldCheckIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { updateCourse, verifyCourseCredentialsWorkflow } from '@/app/_actions'
import ScanQr from '@/app/components/ModalStates/ScanQr'
import useWorkflowExecution from '@/hooks/useWorkflowExecution'
import { Course } from '@/lib/data/types'
import Button from '@/ui/Button'
import Modal from '@/ui/Modal'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

enum ContentState {
  START,
  SCAN_QR,
  SUCCESS,
  FAILED,
}

const StarterContent = () => (
  <div>
    <Title>Enroll into a course</Title>
    <Paragraph>
      Before you can enroll, you need to verify your course certificate. Grab your phone and install{' '}
      <a href="https://linktr.ee/paradym_id" className="font-medium underline" target="_blank">
        Paradym wallet
      </a>{' '}
      to start the verification process.
    </Paragraph>
  </div>
)

const VerificationCompleted = () => (
  <>
    <div>
      <Title>Course successfully verified</Title>
      <Paragraph>
        Your course certificate has been successfully verified. You will now be enrolled in the course.
      </Paragraph>
    </div>
    <div className="-mt-6 flex h-full items-center justify-center pt-4">
      <ShieldCheckIcon className="h-24 w-24 text-indigo-500" />
    </div>
  </>
)

const VerificationFailed = () => (
  <>
    <div>
      <Title>That did not go well</Title>
      <Paragraph>
        Unfortunately your credentials did not match the one required for this course. Please try again later once you
        have obtained the required course certificates.
      </Paragraph>
    </div>
    <div className="-mt-4 flex h-full items-center justify-center">
      <NoSymbolIcon className="h-24 w-24 text-gray-500" />
    </div>
  </>
)

export default function EnrollCourse({ course }: { course: Course }) {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false)
  const [executionId, setExecutionId] = useState('')
  const [contentState, setContentState] = useState(ContentState.START)

  const router = useRouter()
  const [_, startTransition] = useTransition()
  const { execution } = useWorkflowExecution(executionId)

  const url = execution?.payload.actions?.createConnection?.output?.invitationUrl as string
  const isRequestSent = execution?.completedActionIds.includes('createConnection')

  useEffect(() => {
    if (execution?.status === 'completed') setContentState(ContentState.SUCCESS)
    if (execution?.status === 'failed') setContentState(ContentState.FAILED)
  }, [execution?.status])

  async function onEnroll() {
    if (course.requiredCredentials.length === 0) {
      await updateCourse(course.id, { isEnrolled: true })
    } else {
      setIsEnrollModalOpen(true)
    }
  }

  async function onStart() {
    setContentState(ContentState.SCAN_QR)
    const res = await verifyCourseCredentialsWorkflow({
      courseId: course.id,
      requiredCourseId: course.requiredCredentials[0].id,
    })
    setExecutionId(res.result.id)
  }

  function onClose() {
    startTransition(() => {
      router.refresh()
    })
    setIsEnrollModalOpen(false)
    setExecutionId('')

    // Delay so the start content is not showed before the modal is closed
    setTimeout(() => {
      setContentState(ContentState.START)
    }, 500)
  }

  return (
    <>
      <form action={onEnroll} className="grid">
        <Button disabled={course.isCompleted || course.isCredentialReceived}>Enroll</Button>
      </form>
      <Modal open={isEnrollModalOpen} setOpen={setIsEnrollModalOpen}>
        {contentState === ContentState.START && <StarterContent />}
        {contentState === ContentState.SCAN_QR && <ScanQr url={url} isRequestSent={isRequestSent} />}
        {contentState === ContentState.SUCCESS && <VerificationCompleted />}
        {contentState === ContentState.FAILED && <VerificationFailed />}

        {/* Render suitable button for content state */}
        {contentState === ContentState.START ? (
          <Button type="submit" onClick={onStart}>
            I&apos;m Ready!
          </Button>
        ) : (
          <Button onClick={onClose} type="submit">
            {[ContentState.SUCCESS, ContentState.FAILED].includes(contentState) ? 'Close' : 'Cancel'}
          </Button>
        )}
      </Modal>
    </>
  )
}
