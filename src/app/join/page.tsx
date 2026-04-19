'use client'

import Link from 'next/link'
import { useState } from 'react'
import { useAuthStore } from '@/store/auth'
import { useRouter } from 'next/navigation'
import { useLanguageStore } from '@/store/language'
import { t, auth as authT } from '@/data/translations'
import { validate, getErrorForField, ValidationError } from '@/utils/validation'
import { useToastStore } from '@/store/toast'

export default function JoinPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [errors, setErrors] = useState<ValidationError[]>([])
  const [loading, setLoading] = useState(false)
  const register = useAuthStore(state => state.register)
  const router = useRouter()
  const { language } = useLanguageStore()
  const showToast = useToastStore(state => state.show)

  const a = (key: string) => t('auth', key, language)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])

    const validation = validate(
      { name, email, password, confirmPassword, zipCode },
      {
        name: { required: true, minLength: 2 },
        email: { required: true, email: true },
        password: { required: true, minLength: 6 },
        confirmPassword: { required: true, match: 'password' },
        zipCode: { required: true, minLength: 5 }
      }
    )

    if (!validation.isValid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)
    const success = await register(name, email, password, zipCode)
    setLoading(false)

    if (success) {
      showToast(language === 'tr' ? 'Hesap oluşturuldu!' : language === 'it' ? 'Account creato!' : 'Account created!', 'success')
      router.push('/')
    } else {
      setErrors([{ field: 'email', message: language === 'tr' ? 'Bu e-posta zaten kullanılıyor' : language === 'it' ? 'Email già in uso' : 'Email already in use' }])
    }
  }

  return (
    <div className="pt-24 pb-16 min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md px-4">
        <div className="bg-white rounded-2xl shadow-md p-8">
          <h1 className="text-2xl font-bold text-center mb-6">{a('createAccount')}</h1>
          
          <p className="text-gray-600 text-center mb-6">
            {a('joinDesc')}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{a('fullName')}</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getErrorForField('name', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                }`}
                placeholder="John Doe"
              />
              {getErrorForField('name', errors) && (
                <p className="text-red-500 text-xs mt-1">{getErrorForField('name', errors)}</p>
              )}
            </div>

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

            <div>
              <label className="block text-sm font-medium mb-1">
                {language === 'tr' ? 'Şifre Onayla' : language === 'it' ? 'Conferma Password' : 'Confirm Password'}
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getErrorForField('confirmPassword', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                }`}
                placeholder="••••••••"
              />
              {getErrorForField('confirmPassword', errors) && (
                <p className="text-red-500 text-xs mt-1">{getErrorForField('confirmPassword', errors)}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">{a('zipCode')}</label>
              <input
                type="text"
                value={zipCode}
                onChange={(e) => setZipCode(e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 ${
                  getErrorForField('zipCode', errors) ? 'border-red-500 focus:ring-red-500/50' : 'focus:ring-primary/50'
                }`}
                placeholder="10001"
              />
              {getErrorForField('zipCode', errors) && (
                <p className="text-red-500 text-xs mt-1">{getErrorForField('zipCode', errors)}</p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {a('zipDesc')}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary disabled:opacity-50"
            >
              {loading ? a('creating') : a('createAccountBtn')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-600">
            {a('alreadyHaveAccount')}{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              {language === 'tr' ? 'Giriş yap' : language === 'it' ? 'Accedi' : 'Sign in'}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}