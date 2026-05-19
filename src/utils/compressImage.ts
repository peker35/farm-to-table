export interface CompressOptions {
  maxWidth?: number
  maxHeight?: number
  quality?: number
  format?: 'jpeg' | 'webp'
}

export async function compressImage(
  file: File,
  options: CompressOptions = {}
): Promise<string> {
  const {
    maxWidth = 800,
    maxHeight = 800,
    quality = 0.8,
    format = 'jpeg'
  } = options

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      const img = new Image()
      img.src = reader.result as string
      img.onload = () => {
        let { width, height } = img
        if (width > maxWidth) {
          height = Math.round(height * (maxWidth / width))
          width = maxWidth
        }
        if (height > maxHeight) {
          width = Math.round(width * (maxHeight / height))
          height = maxHeight
        }
        const canvas = document.createElement('canvas')
        canvas.width = width
        canvas.height = height
        const ctx = canvas.getContext('2d')
        if (!ctx) { reject(new Error('Canvas context not available')); return }
        ctx.drawImage(img, 0, 0, width, height)
        const mimeType = format === 'webp' ? 'image/webp' : 'image/jpeg'
        resolve(canvas.toDataURL(mimeType, quality))
      }
      img.onerror = () => reject(new Error('Failed to load image'))
    }
    reader.onerror = () => reject(new Error('Failed to read file'))
  })
}

export async function compressImageToThumbnail(file: File): Promise<string> {
  return compressImage(file, { maxWidth: 400, maxHeight: 400, quality: 0.7 })
}

export async function compressImageToFull(file: File): Promise<string> {
  return compressImage(file, { maxWidth: 800, maxHeight: 800, quality: 0.8 })
}