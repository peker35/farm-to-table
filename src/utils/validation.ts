export interface ValidationRule {
  required?: boolean
  minLength?: number
  maxLength?: number
  email?: boolean
  min?: number
  match?: string
}

export interface ValidationRules {
  [key: string]: ValidationRule
}

export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

export function validate(values: Record<string, string>, rules: ValidationRules): ValidationResult {
  const errors: ValidationError[] = []

  for (const field in rules) {
    const value = values[field] || ''
    const rule = rules[field]

    if (rule.required && !value.trim()) {
      errors.push({ field, message: `${field} is required` })
      continue
    }

    if (rule.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errors.push({ field, message: 'Invalid email format' })
      }
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors.push({ field, message: `Minimum ${rule.minLength} characters required` })
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors.push({ field, message: `Maximum ${rule.maxLength} characters allowed` })
    }

    if (rule.min !== undefined && value) {
      const num = parseFloat(value)
      if (isNaN(num) || num < rule.min) {
        errors.push({ field, message: `Minimum value is ${rule.min}` })
      }
    }

    if (rule.match && value !== values[rule.match]) {
      errors.push({ field, message: 'Passwords do not match' })
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  }
}

export function getErrorForField(field: string, errors: ValidationError[]): string | undefined {
  return errors.find(e => e.field === field)?.message
}