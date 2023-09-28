'use client'

import { Menu, Transition } from '@headlessui/react'
import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Fragment } from 'react'

import { resetToInit } from '@/lib/data/getOrCreate'

export default function ProfileDropdown({ imageUrl }: { imageUrl: string }) {
  const router = useRouter()

  const onReset = () => {
    resetToInit()
    router.refresh()
  }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          {/* eslint-disable @next/next/no-img-element */}
          <img className="h-8 w-8 rounded-full" src={imageUrl} alt="Profile picture" />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={onReset}
                  className={clsx(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block w-full px-4 py-2 text-left text-sm'
                  )}
                >
                  Reset demo state
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}
