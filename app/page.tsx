import { redirect } from 'next/navigation'

export default async function Page() {
  redirect('/overview')

  return null
}
