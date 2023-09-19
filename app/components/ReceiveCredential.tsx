'use client'

import { useQRCode } from 'next-qrcode'
import { useEffect, useState } from 'react'

import { issueCourseCredentialWorkflow, updateCourse } from '@/app/_actions'
import useWorkflowExecution from '@/hooks/useWorkflowExecution'
import { Course, Student } from '@/lib/data/types'
import Button from '@/ui/Button'
import Loader from '@/ui/Loader'
import Modal from '@/ui/Modal'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

enum ContentState {
  START,
  SCAN_QR,
  RECEIVED,
}

const StarterContent = () => (
  <div>
    <Title>Receive your course certificate</Title>
    <Paragraph>
      Congratulations on completing the course! Grab your phone and install{' '}
      <a href="https://linktr.ee/paradym_id" className="font-medium underline" target="_blank">
        Paradym wallet
      </a>{' '}
      to receive your course certificate.
    </Paragraph>
  </div>
)

const ScanQRContent = ({ url }: { url: string }) => {
  const { Canvas } = useQRCode()
  return (
    <div className="flex h-full flex-col">
      <div>
        <Title>Scan the QR Code</Title>
        <Paragraph>Use the Paradym Wallet to scan the QR code below.</Paragraph>
      </div>
      <div className="flex grow items-center justify-center">
        {url ? (
          <Canvas
            text={url}
            options={{
              errorCorrectionLevel: 'M',
              scale: 4,
              width: 196,
            }}
          />
        ) : (
          <Loader />
        )}
      </div>
    </div>
  )
}

const CredentialReceived = () => (
  <div>
    <Title>Certificate issuance completed</Title>
    <Paragraph>Your course certificate has been saved in your wallet. You can now close this window.</Paragraph>
  </div>
)

export default function ReceiveCredential({ student, course }: { student: Student; course: Course }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [executionId, setExecutionId] = useState('')
  const [contentState, setContentState] = useState(ContentState.START)

  const { execution } = useWorkflowExecution(executionId)
  const url = execution?.payload.actions?.createConnection?.output?.invitationUrl as string
  const credentialIssued = execution?.completedActionIds.includes('issueCredential')

  useEffect(() => {
    if (credentialIssued) {
      updateCourse(course.id, { isCredentialReceived: true })
      setContentState(ContentState.RECEIVED)
    }
  }, [course.id, credentialIssued])

  const onIssue = async () => {
    setContentState(ContentState.SCAN_QR)
    const res = await issueCourseCredentialWorkflow({
      studentNumber: student.studentNumber,
      name: student.name,
      course: course.name,
    })

    // Alert if error message is present
    if (res.result.message) alert(res.result.message)

    setExecutionId(res.result.id)
  }

  const onClose = () => {
    setIsModalOpen(false)
    setExecutionId('')

    // Delay so the start content is not showed before the modal is closed
    setTimeout(() => {
      setContentState(ContentState.START)
    }, 500)
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} disabled={!course.isCompleted || course.isCredentialReceived}>
        {course.isCredentialReceived ? 'Certificate received' : 'Claim Certificate'}
      </Button>
      <Modal open={isModalOpen} setOpen={setIsModalOpen} className="flex h-[440px] flex-col justify-between p-8">
        {contentState === ContentState.START && <StarterContent />}
        {contentState === ContentState.SCAN_QR && <ScanQRContent url={url} />}
        {contentState === ContentState.RECEIVED && <CredentialReceived />}
        {contentState === ContentState.START ? (
          <Button type="submit" onClick={onIssue}>
            I&apos;m Ready!
          </Button>
        ) : (
          <Button onClick={onClose} type="submit">
            {contentState === ContentState.RECEIVED ? 'Close' : 'Cancel'}
          </Button>
        )}
      </Modal>
    </>
  )
}
