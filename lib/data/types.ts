export type Course = {
  id: string
  name: string
  subTitle: string
  isEnrolled: boolean
  isCompleted: boolean
  isCredentialReceived: boolean
  imageUrl: string
  content: string
  requiredCredentials: Array<{ id: string; name: string }>
  credentialDefinition: string
}

export type Student = {
  studentNumber: string
  name: string
  imageUrl: string
  email: string
}

export type Data = {
  student: Student
  courses: Course[]
}
