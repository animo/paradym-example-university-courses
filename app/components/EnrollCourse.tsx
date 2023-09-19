'use client'

import { useRouter } from 'next/navigation'
import { useQRCode } from 'next-qrcode'
import { useEffect, useState, useTransition } from 'react'

import { updateCourse, verifyCourseCredentialsWorkflow } from '@/app/_actions'
import useWorkflowExecution from '@/hooks/useWorkflowExecution'
import { Course } from '@/lib/data/types'
import Button from '@/ui/Button'
import Loader from '@/ui/Loader'
import Modal from '@/ui/Modal'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

enum ContentState {
  START,
  SCAN_QR,
  REQUEST_ANSWERED,
}

const StartContent = () => (
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

const ScanQRContent = ({ url, isRequestSent }: { url: string; isRequestSent?: boolean }) => {
  const { Canvas } = useQRCode()
  return (
    <div className="flex h-full flex-col">
      <div>
        <Title>Scan the QR Code</Title>
        <Paragraph>Use the Paradym Wallet to scan the QR code below.</Paragraph>
      </div>
      <div className="flex grow items-center justify-center">
        {url ? (
          isRequestSent ? (
            <Paragraph>Accept the request in your wallet.</Paragraph>
          ) : (
            <Canvas
              text={url}
              options={{
                errorCorrectionLevel: 'M',
                scale: 4,
                width: 196,
              }}
            />
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

const VerificationCompleteContent = ({ hasRequiredCredentials }: { hasRequiredCredentials: boolean }) => (
  <div>
    <Title>Verification received</Title>
    <Paragraph>
      {hasRequiredCredentials
        ? 'You have successfully enrolled in this course.'
        : 'Unfortunately your credentials did not match the one required for this course. Please try again later once you have obtained the required course certificates.'}
    </Paragraph>
  </div>
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
  const isWorkflowDone = execution?.status === 'completed' || execution?.status === 'failed'
  const hasRequiredCreds = execution?.status === 'completed'

  useEffect(() => {
    if (isWorkflowDone) {
      setContentState(ContentState.REQUEST_ANSWERED)
    }
  }, [isWorkflowDone])

  async function onEnroll() {
    if (course.requiredCredentials.length === 0) {
      await updateCourse(course.id, { isEnrolled: true })
    } else {
      setIsEnrollModalOpen(true)
    }
  }

  async function onStart() {
    setContentState(ContentState.SCAN_QR)
    const res = await verifyCourseCredentialsWorkflow(course.requiredCredentials[0].name)
    setExecutionId(res.result.id)
  }

  function onClose() {
    if (hasRequiredCreds) {
      updateCourse(course.id, { isEnrolled: true })
      startTransition(() => {
        router.refresh()
      })
    }
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
      <Modal
        open={isEnrollModalOpen}
        setOpen={setIsEnrollModalOpen}
        className="flex h-[440px] flex-col justify-between p-8"
      >
        {ContentState.START === contentState && <StartContent />}
        {ContentState.SCAN_QR === contentState && <ScanQRContent url={url} isRequestSent={isRequestSent} />}
        {ContentState.REQUEST_ANSWERED === contentState && (
          <VerificationCompleteContent hasRequiredCredentials={hasRequiredCreds} />
        )}

        {contentState === ContentState.START ? (
          <Button type="submit" onClick={onStart}>
            I&apos;m Ready!
          </Button>
        ) : (
          <Button onClick={onClose} type="submit">
            {contentState === ContentState.REQUEST_ANSWERED ? 'Close' : 'Cancel'}
          </Button>
        )}
      </Modal>
    </>
  )
}
