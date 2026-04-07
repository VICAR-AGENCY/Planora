import { useRef, useState } from 'react'
import { Upload } from 'lucide-react'
import { useFileUpload } from '@/hooks/useFileUpload'

interface QuoteUploadProps {
  onUploaded: (url: string) => void
}

export function QuoteUpload({ onUploaded }: QuoteUploadProps) {
  const { upload, isUploading } = useFileUpload('quotes')
  const inputRef = useRef<HTMLInputElement>(null)
  const [dragActive, setDragActive] = useState(false)

  const handleFile = async (file: File) => {
    const url = await upload(file)
    if (url) onUploaded(url)
  }

  return (
    <div
      className={`rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
        dragActive ? 'border-primary-400 bg-primary-50' : 'border-neutral-300'
      }`}
      onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
      onDragLeave={() => setDragActive(false)}
      onDrop={(e) => {
        e.preventDefault()
        setDragActive(false)
        const file = e.dataTransfer.files[0]
        if (file) handleFile(file)
      }}
    >
      <input
        ref={inputRef}
        type="file"
        accept=".pdf"
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
        }}
        className="hidden"
      />
      <Upload className="mx-auto h-8 w-8 text-neutral-400" />
      <p className="mt-2 text-sm text-neutral-600">
        {isUploading ? 'Bezig met uploaden...' : 'Sleep je offerte PDF hierheen of'}
      </p>
      {!isUploading && (
        <button
          onClick={() => inputRef.current?.click()}
          className="mt-2 text-sm font-medium text-primary-600 hover:text-primary-700"
        >
          blader door je bestanden
        </button>
      )}
    </div>
  )
}
