import { useState, useCallback } from 'react'
import { uploadFile, getPublicUrl } from '@/lib/supabase/storage'

export function useFileUpload(bucket: string) {
  const [isUploading, setIsUploading] = useState(false)

  const upload = useCallback(
    async (file: File, path?: string) => {
      setIsUploading(true)
      try {
        const filePath = path ?? `${crypto.randomUUID()}-${file.name}`
        const { error } = await uploadFile(bucket, filePath, file)
        if (error) throw error
        return getPublicUrl(bucket, filePath)
      } finally {
        setIsUploading(false)
      }
    },
    [bucket]
  )

  return { upload, isUploading }
}
