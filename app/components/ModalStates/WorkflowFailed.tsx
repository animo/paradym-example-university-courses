import { NoSymbolIcon } from '@heroicons/react/24/solid'

import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

export default function WorkflowFailed() {
  return (
    <>
      <div>
        <Title>That did not go as planned.</Title>
        <Paragraph>
          There was a problem with receiving your course certificate. Please close this window and restart the issuance
          process.
        </Paragraph>
      </div>
      <div className="-mt-2 flex h-full items-center justify-center">
        <NoSymbolIcon className="h-24 w-24 text-gray-500" />
      </div>
    </>
  )
}
