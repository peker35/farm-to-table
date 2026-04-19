interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export default function Spinner({ size = 'md', className = '' }: SpinnerProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  }

  return (
    <div className={`${sizes[size]} ${className}`}>
      <div className="animate-spin rounded-full border-2 border-primary border-t-transparent"></div>
    </div>
  )
}

export function LoadingOverlay() {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-[150]">
      <div className="bg-white rounded-xl p-6">
        <Spinner size="lg" />
      </div>
    </div>
  )
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Spinner size="lg" />
    </div>
  )
}