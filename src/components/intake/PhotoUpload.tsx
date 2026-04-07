import { useRef } from 'react'
import { Camera } from 'lucide-react'

interface PhotoUploadProps {
  onUpload: (files: File[]) => void
  disabled?: boolean
}

export function PhotoUpload({ onUpload, disabled }: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? [])
    if (files.length > 0) onUpload(files)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handleChange}
        className="hidden"
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={disabled}
        className="rounded-xl border border-neutral-300 p-3 text-neutral-500 hover:bg-neutral-50 disabled:opacity-50 transition-colors"
        aria-label="Upload foto"
      >
        <Camera size={18} />
      </button>
    </>
  )
}
