import { PARADYM_API_KEY } from '@/constants'

const PARADYM_URL = 'https://api.paradym.id'

export const paradymFetch = async (path: string, init?: RequestInit | undefined) => {
  return await fetch(PARADYM_URL + path, {
    ...init,
    headers: {
      'x-access-token': PARADYM_API_KEY,
      'Content-Type': 'application/json',
      ...init?.headers,
    },
    next: {
      revalidate: 0, // Do not cache the response
    },
  })
}
