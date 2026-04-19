'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import { t, auth as authT } from '@/data/translations'
import LanguageSelector from '@/components/LanguageSelector'
import { validate, getErrorForField, ValidationError } from '@/utils/validation'
import { useToastStore } from '@/store/toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [loading, setLoading] = useState(false)
  const login = useAuthStore(state => state.login)
  const router = useRouter()
  const { language } = useLanguageStore()
  const showToast = useToastStore(state => state.show)

  const a = (key: string) => t('auth', key, language)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validation = validate(
      { email, password },
      {
        email: { required: true, email: true },
        password: { required: true, minLength: 6 }
      }
    )

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    const success = await login(email, password)
    setLoading(false)

    if (success) {
      showToast(language === 'tr' ? 'Giriş başarılı!' : language === 'it' ? 'Accesso effettuato!' : 'Logged in successfully!', 'success')
      router.push('/')
    } else {
      setErrors([{ field: 'password', message: a('invalidCredentials') }])
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="absolute top-4 right-4">
        <LanguageSelector />
      </div>
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">{a('welcomeBack')}</h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{a('email')}</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getErrorForField('email', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                }`}
                placeholder="you@example.com"
              />
              {getErrorForField('email', errors) && (
                <p className="text-red-500 text-xs mt-1">{getErrorForField('email', errors)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{a('password')}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getErrorForField('password', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                }`}
                placeholder="••••••••"
              />
              {getErrorForField('password', errors) && (
                <p className="text-red-500 text-xs mt-1">{getErrorForField('password', errors)}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded" />
                <span>{a('rememberMe')}</span>
              </label>
              <Link href="/forgot-password" className="text-primary hover:underline">
                {a('forgotPassword')}
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? a('signingIn') : a('signIn')}
            </button>
          </form>

          <div className="mt-6 text-center text-gray-600">
            {a('noAccount')}{' '}
            <Link href="/join" className="text-primary hover:underline font-medium">
              {a('joinNow')}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}