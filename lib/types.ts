// All types will soon be available in a Paradym Utils library.

export type WorkflowExecution = {
  id: string
  workflowId: string
  status: string
  payload: {
    input: Record<string, unknown>
    actions: Action
  }
  completedActionIds: string[]
  createdAt: string
  updatedAt: string
  startTime: string
  isCancellationRequested: boolean
  endTime?: string
  error?: Record<string, unknown>
}

export type Action = {
  [key: string]: {
    output: Record<string, unknown>
  }
}
