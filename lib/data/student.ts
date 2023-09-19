import { promises as fs } from 'fs'

import { Student } from '@/lib/data/types'

export const getStudent = async () => {
  const jsonData = await fs.readFile(process.cwd() + '/lib/data/data.json', 'utf8')

  return JSON.parse(jsonData).student as Student
}
