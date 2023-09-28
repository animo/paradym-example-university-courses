import { useQRCode } from 'next-qrcode'

import Loader from '@/ui/Loader'
import Paragraph from '@/ui/Paragraph'
import Title from '@/ui/Title'

export default function ScanQr({ url, isRequestSent }: { url: string; isRequestSent?: boolean }) {
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
            <span className="text-sm text-gray-600">Accept the request in your wallet.</span>
          ) : (
            <Canvas
              text={url}
              options={{
                errorCorrectionLevel: 'M',
                scale: 4,
                width: 256,
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
