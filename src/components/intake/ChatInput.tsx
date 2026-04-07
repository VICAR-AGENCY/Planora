import { useState, useRef, type FormEvent } from 'react'
import { Send, Camera } from 'lucide-react'

interface ChatInputProps {
  onSend: (message: string, photos?: string[]) => void
  disabled?: boolean
}

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (!value.trim() || disabled) return
    onSend(value.trim())
    setValue('')
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files?.length) return
    // For MVP, create object URLs as photo previews
    const urls = Array.from(files).map((f) => URL.createObjectURL(f))
    onSend('Foto geüpload', urls)
    e.target.value = ''
  }

  return (
    <form onSubmit={handleSubmit} className="flex items-end gap-2 border-t border-primary-100 bg-white p-4">
      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={handleFileChange}
      />
      <button
        type="button"
        onClick={() => fileRef.current?.click()}
        disabled={disabled}
        className="rounded-xl border border-neutral-200 p-3 text-neutral-400 hover:text-primary-600 hover:border-primary-300 disabled:opacity-50 transition-colors"
      >
        <Camera size={18} />
      </button>
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit(e)
          }
        }}
        placeholder="Typ je bericht..."
        rows={1}
        disabled={disabled}
        className="flex-1 resize-none rounded-xl border border-neutral-200 px-4 py-3 text-sm focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20 disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={disabled || !value.trim()}
        className="rounded-xl bg-primary-600 p-3 text-white hover:bg-primary-700 disabled:opacity-50 transition-colors"
      >
        <Send size={18} />
      </button>
    </form>
  )
}
