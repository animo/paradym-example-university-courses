'use server'

import { promises as fs } from 'fs'

import { getOrCreateData } from './getOrCreate'

import { Course } from '@/lib/data/types'

export const getCourses = async () => {
  const { courses } = await getOrCreateData()

  return courses.sort(
    (a, b) =>
      Number(a.isEnrolled) - Number(b.isEnrolled) ||
      Number(a.isCredentialReceived) - Number(b.isCredentialReceived) ||
      Number(a.isCompleted) - Number(b.isCompleted)
  )
}

export const getCourseById = async (id: string) => {
  const courses = await getCourses()

  return courses.find((c) => c.id === id)
}

export const updateCourseById = async (id: string, updatedCourse: Partial<Course>) => {
  const courses = await getCourses()
  const courseIndex = courses.findIndex((c) => c.id === id)

  if (courseIndex === -1) return null

  courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse }

  // Update the JSON file with the modified data
  const updatedData = {
    ...JSON.parse(await fs.readFile(process.cwd() + '/lib/data/data.json', 'utf8')),
    courses: courses,
  }

  await fs.writeFile(process.cwd() + '/lib/data/data.json', JSON.stringify(updatedData, null, 2), 'utf8')

  return courses[courseIndex]
}

export const updateCourseByName = async (name: string, updatedCourse: Partial<Course>) => {
  const courses = await getCourses()
  const courseIndex = courses.findIndex((c) => c.name === name)

  if (courseIndex === -1) return null

  courses[courseIndex] = { ...courses[courseIndex], ...updatedCourse }

  // Update the JSON file with the modified data
  const updatedData = {
    ...JSON.parse(await fs.readFile(process.cwd() + '/lib/data/data.json', 'utf8')),
    courses: courses,
  }

  await fs.writeFile(process.cwd() + '/lib/data/data.json', JSON.stringify(updatedData, null, 2), 'utf8')

  return courses[courseIndex]
}
