'use server'

import type { Data } from '@/lib/data/types'

import { promises as fs } from 'fs'

export async function getOrCreateData() {
  let jsonData: string

  try {
    jsonData = await fs.readFile(process.cwd() + '/lib/data/data.json', 'utf8')
  } catch (error) {
    jsonData = await fs.readFile(process.cwd() + '/lib/data/init.json', 'utf8')
    await fs.writeFile(process.cwd() + '/lib/data/data.json', jsonData, 'utf8')
  }

  return JSON.parse(jsonData) as Data
}

export const resetToInit = async () => {
  const initData = await fs.readFile(process.cwd() + '/lib/data/init.json', 'utf8')
  await fs.writeFile(process.cwd() + '/lib/data/data.json', initData, 'utf8')
}
