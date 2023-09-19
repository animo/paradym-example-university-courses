type CourseStatusBadgeProps = {
  isCompleted: boolean
  isEnrolled: boolean
  isCredentialReceived: boolean
}

export default function CourseStatusBadge({ isCompleted, isEnrolled, isCredentialReceived }: CourseStatusBadgeProps) {
  return (
    <div className="flex flex-col items-end">
      {isCompleted ? (
        <div className="flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            {isCredentialReceived ? (
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            ) : (
              <div className="h-1.5 w-1.5 rounded-full bg-blue-500" />
            )}
          </div>
          <p className="text-xs leading-5 text-gray-500">{isCredentialReceived ? 'Completed' : 'Certificate ready'}</p>
        </div>
      ) : isEnrolled ? (
        <div className="flex items-center gap-x-1.5">
          <div className="flex-none rounded-full bg-emerald-500/20 p-1">
            <div className="h-1.5 w-1.5 rounded-full bg-yellow-500" />
          </div>
          <p className="text-xs leading-5 text-gray-500">Enrolled</p>
        </div>
      ) : (
        <p className="text-xs leading-5 text-gray-500">Not started</p>
      )}
    </div>
  )
}
