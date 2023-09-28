'use client'

export default function Footer() {
  const year = new Date().getFullYear()

  return <footer className="flex w-full items-center justify-center pb-4 text-sm">© {year} Silicon University</footer>
}
