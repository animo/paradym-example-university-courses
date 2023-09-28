import { AcademicCapIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'

import NavigationItems from '@/app/components/NavigationItems'
import ProfileDropdown from '@/app/components/ProfileDropdown'
import { getStudent } from '@/lib/data/student'
import Container from '@/ui/Container'

export default async function Header() {
  const student = await getStudent()

  return (
    <header className="z-50 w-full border-b border-b-gray-300 bg-indigo-700 shadow">
      <Container className="flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="h-6 w-6 text-white">
            <AcademicCapIcon />
          </Link>
          <NavigationItems />
        </div>
        <ProfileDropdown imageUrl={student.imageUrl} />
      </Container>
    </header>
  )
}
