export default function Button({ ...props }: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className="disabled:border-grey-400 flex items-center justify-center rounded-lg bg-gray-700 px-4 py-2 font-medium text-gray-100 duration-200 hover:bg-gray-500 hover:text-white disabled:cursor-not-allowed disabled:border disabled:bg-white disabled:text-gray-400"
      {...props}
    />
  )
}
