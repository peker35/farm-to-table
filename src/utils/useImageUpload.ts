import { compressImage } from './compressImage'

export async function uploadImage(file: File): Promise<string> {
  const compressed = await compressImage(file)

  const res = await fetch(compressed)
  const blob = await res.blob()
  const uploadFile = new File([blob], file.name.replace(/\.[^.]+$/, '.jpg'), { type: 'image/jpeg' })

  const formData = new FormData()
  formData.append('file', uploadFile)

  const res2 = await fetch('/api/upload', { method: 'POST', body: formData })
  if (!res2.ok) throw new Error('Upload failed')

  const data = await res2.json()
  return data.url
}

export async function deleteImage(url: string): Promise<void> {
  if (!url || url.startsWith('data:')) return
  await fetch(`/api/upload?url=${encodeURIComponent(url)}`, { method: 'DELETE' })
}