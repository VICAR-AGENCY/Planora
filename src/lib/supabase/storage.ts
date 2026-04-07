import { supabase } from './client'

export async function uploadFile(bucket: string, path: string, file: File) {
  return supabase.storage.from(bucket).upload(path, file)
}

export function getPublicUrl(bucket: string, path: string) {
  return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl
}
