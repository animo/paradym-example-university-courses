import { getOrCreateData } from './getOrCreate'

export const getStudent = async () => {
  const { student } = await getOrCreateData()

  return student
}
