import { Loader2Icon } from "lucide-react"

export function Loader () {
  return (
    <div className="w-screen h-screen fixed flex items-center justify-center">
      <Loader2Icon className="animate-spin" size={50} />
    </div>
  )
}