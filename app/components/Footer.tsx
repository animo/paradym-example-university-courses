'use client'

import { useRouter } from 'next/navigation'

import { resetToInit } from '@/lib/data/getOrCreate'

export default function Footer() {
  const router = useRouter()
  const year = new Date().getFullYear()

  const onReset = () => {
    resetToInit()
    router.refresh()
  }

  return (
    <footer className="flex w-full items-center justify-center pb-4 text-sm">
      © {year} Silicon University.&nbsp;
      <form action={onReset} className="font-medium">
        <button type="submit" className="underline underline-offset-2">
          Reset app to initial state
        </button>
      </form>
      .
    </footer>
  )
}
