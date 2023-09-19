import type { PropsWithChildren } from 'react'

import { Dialog, Transition } from '@headlessui/react'
import { clsx } from 'clsx'
import { useRef, Fragment } from 'react'

export interface ModalProps {
  open: boolean
  setOpen(open: boolean): void
  className?: string
}

const baseStyle =
  'relative transform overflow-hidden rounded-lg bg-white dark:bg-grey-900 text-left shadow-xl transition-all sm:w-full sm:max-w-lg border border-grey-300 dark:border-grey-700'

export default function Modal({ open, setOpen, className, ...props }: PropsWithChildren<ModalProps>) {
  const cancelButtonRef = useRef(null)
  className = clsx(baseStyle, className)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-900/50" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className={className}>{props.children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
