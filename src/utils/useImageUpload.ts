import { compressImage } from './compressImage'

export async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file)

  const blob = new Blob([compressed], { type: 'image/jpeg' })
  const uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })

  const formData = new FormData()
  formData.append('file', uploadFile)

  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!res.ok) throw new Error('Upload failed')

  const data = await res.json()
  return data.url
}

export async function deleteImage(url: string): Promise<void> {
  if (!url || url.startsWith('data:')) return
  await fetch(`/api/upload?url=${encodeURIComponent(url)}`, { method: 'DELETE' })
}