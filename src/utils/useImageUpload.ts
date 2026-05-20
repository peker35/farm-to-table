export async function uploadImage(file: File): Promise<string> {
  const formData = new FormData()
  formData.append('file', file)

  const res = await fetch('/api/upload', { method: 'POST', body: formData })
  const data = await res.json().catch(() => null)
  if (!res.ok) throw new Error(data?.error || 'Upload failed')

  return data.url
}

export async function dataUrlToFile(dataUrl: string, filename: string): Promise<File> {
  const res = await fetch(dataUrl)
  const blob = await res.blob()
  const extension = blob.type.split('/')[1] || 'jpg'
  const normalizedName = filename.replace(/\.[^.]+$/, '') + `.${extension}`

  return new File([blob], normalizedName, { type: blob.type || 'image/jpeg' })
}

export async function deleteImage(url: string): Promise<void> {
  if (!url || url.startsWith('data:')) return
  await fetch(`/api/upload?url=${encodeURIComponent(url)}`, { method: 'DELETE' })
}
