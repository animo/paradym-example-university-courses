import { WorkflowExecution } from '@/lib/types'

export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export function hasRequiredCredentials(
  requiredCourseName: string,
  verificationComplete?: boolean,
  execution?: WorkflowExecution
): boolean {
  if (!verificationComplete || !execution) return false

  try {
    const actionOutput = execution?.payload?.actions?.requestPresentation?.output

    const courseName =
      //@ts-ignore
      actionOutput?.presentationExchange?.anoncreds?.presentation?.attributes[0]?.value?.course

    return courseName === requiredCourseName
  } catch (e) {
    return false
  }
}
