'use client'

import { ShieldCheckIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'

import { issueCourseCredentialWorkflow } from '@/app/_actions'
import ScanQr from '@/app/components/ModalStates/ScanQr'
import WorkflowFailed from '@/app/components/ModalStates/WorkflowFailed'
import useWorkflowExecution from '@/hooks/useWorkflowExecution'
import { Course, Student } from '@/lib/data/types'
import Button from '@/ui/Button'
import Modal from '@/ui/Modal'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

enum ContentState {
  START,
  SCAN_QR,
  RECEIVED,
  FAILED,
}

const StarterContent = () => (
  <div>
    <Title>Claim your certificate</Title>
    <Paragraph>
      Congratulations on completing the course! Grab your phone and install{' '}
      <a href="https://linktr.ee/paradym_id" className="font-medium underline" target="_blank">
        Paradym wallet
      </a>{' '}
      to receive your course certificate.
    </Paragraph>
  </div>
)

const CertificateReceived = () => (
  <>
    <div>
      <Title>Certificate issued!</Title>
      <Paragraph>Your course certificate has been saved in your wallet. You can now close this window.</Paragraph>
    </div>
    <div className="flex h-full items-center justify-center">
      <ShieldCheckIcon className="h-24 w-24 text-indigo-500" />
    </div>
  </>
)

export default function ReceiveCredential({ student, course }: { student: Student; course: Course }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [executionId, setExecutionId] = useState('')
  const [contentState, setContentState] = useState(ContentState.START)

  const router = useRouter()
  const [_, startTransition] = useTransition()
  const { execution } = useWorkflowExecution(executionId)
  const url = execution?.payload.actions?.createConnection?.output?.invitationUrl as string
  const credentialIssued = execution?.completedActionIds.includes('issueCredential')
  const isRequestSent = execution?.completedActionIds.includes('createConnection')

  useEffect(() => {
    if (execution?.status === 'failed') setContentState(ContentState.FAILED)
    if (credentialIssued) setContentState(ContentState.RECEIVED)
  }, [execution, credentialIssued])

  const onIssue = async () => {
    setContentState(ContentState.SCAN_QR)
    const res = await issueCourseCredentialWorkflow({
      studentNumber: student.studentNumber,
      studentName: student.name,
      courseId: course.id,
      courseName: course.name,
    })

    // Alert if error message is present
    if (res.result.message) alert(res.result.message)

    setExecutionId(res.result.id)
  }

  const onClose = () => {
    setIsModalOpen(false)
    setExecutionId('')
    startTransition(() => {
      router.refresh()
    })

    // Delay so the start content is not showed before the modal is closed
    setTimeout(() => {
      setContentState(ContentState.START)
    }, 500)
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} disabled={!course.isCompleted || course.isCredentialReceived}>
        {course.isCredentialReceived ? 'Certificate received' : 'Claim certificate'}
      </Button>
      <Modal open={isModalOpen} setOpen={setIsModalOpen}>
        {contentState === ContentState.START && <StarterContent />}
        {contentState === ContentState.SCAN_QR && <ScanQr url={url} isRequestSent={isRequestSent} />}
        {contentState === ContentState.RECEIVED && <CertificateReceived />}
        {contentState === ContentState.FAILED && <WorkflowFailed />}

        {/* Render suitable button for content state */}
        {contentState === ContentState.START ? (
          <Button type="submit" onClick={onIssue}>
            Let&apos;s go!
          </Button>
        ) : (
          <Button onClick={onClose} type="submit">
            {[ContentState.RECEIVED, ContentState.FAILED].includes(contentState) ? 'Close' : 'Cancel'}
          </Button>
        )}
      </Modal>
    </>
  )
}
