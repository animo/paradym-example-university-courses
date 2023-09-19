export type Course = {
  id: string
  name: string
  subTitle: string
  isEnrolled: boolean
  isCompleted: boolean
  isCredentialReceived: boolean
  imageUrl: string
  content: string
  requiredCredentials: Array<{ name: string }>
  credentialDefinition: string
}

export type Student = {
  studentNumber: string
  name: string
  imageUrl: string
  email: string
}
