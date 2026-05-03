'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, UserPlus } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import api from '@/lib/api'
import { setTokens } from '@/lib/auth'

const schema = z
  .object({
    username: z.string().min(3, 'Username must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    password2: z.string(),
  })
  .refine((d) => d.password === d.password2, {
    message: 'Passwords do not match',
    path: ['password2'],
  })

type FormValues = z.infer<typeof schema>

export default function RegisterPage() {
  const router = useRouter()
  const [showPass, setShowPass] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const shouldReduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormValues) {
    setApiError(null)
    try {
      await api.post('/api/auth/register/', {
        username: data.username,
        email: data.email,
        password: data.password,
        password2: data.password2,
      })
      // Auto-login after registration
      const res = await api.post<{ access: string; refresh: string }>('/api/auth/login/', {
        username: data.username,
        password: data.password,
      })
      setTokens({ access: res.data.access, refresh: res.data.refresh })
      document.cookie = `forge_access=${res.data.access}; path=/; max-age=3600; SameSite=Lax`
      router.push('/dashboard')
    } catch {
      setApiError('Registration failed. Username or email may already be in use.')
    }
  }

  const fields = [
    { id: 'reg-username', name: 'username' as const, label: 'Username', type: 'text', placeholder: 'your_username', autocomplete: 'username' },
    { id: 'reg-email', name: 'email' as const, label: 'Email', type: 'email', placeholder: 'you@example.com', autocomplete: 'email' },
  ]

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      <motion.div
        variants={shouldReduceMotion ? undefined : fadeUp}
        className="rounded-[var(--gridnest-radius-xl)] border border-[var(--gridnest-border)] bg-[var(--gridnest-surface)] p-8 shadow-[var(--gridnest-shadow-md)]"
      >
        <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="mb-8">
          <h1 className="font-sans text-2xl font-bold text-[var(--gridnest-text-primary)] tracking-tight mb-1">
            Create account
          </h1>
          <p className="text-sm text-[var(--gridnest-text-secondary)]">
            Get started with GridNest today
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {fields.map((field) => (
            <motion.div key={field.id} variants={shouldReduceMotion ? undefined : fadeUp}>
              <label htmlFor={field.id} className="mb-1.5 block text-xs font-medium text-[var(--gridnest-text-primary)]">
                {field.label}
              </label>
              <input
                id={field.id}
                type={field.type}
                autoComplete={field.autocomplete}
                placeholder={field.placeholder}
                {...register(field.name)}
                className={`w-full rounded-[var(--gridnest-radius-md)] border bg-[var(--gridnest-bg)] px-3 py-2.5 text-sm text-[var(--gridnest-text-primary)] placeholder:text-[var(--gridnest-text-muted)] outline-none transition-colors focus:ring-2 focus:ring-[var(--gridnest-accent)] ${
                  errors[field.name] ? 'border-[var(--gridnest-danger)]' : 'border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)]'
                }`}
              />
              {errors[field.name] && (
                <p className="mt-1 text-xs text-[var(--gridnest-danger)]">{errors[field.name]?.message}</p>
              )}
            </motion.div>
          ))}

          {/* Password */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
            <label htmlFor="reg-password" className="mb-1.5 block text-xs font-medium text-[var(--gridnest-text-primary)]">
              Password
            </label>
            <div className="relative">
              <input
                id="reg-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="new-password"
                placeholder="Min 8 characters"
                {...register('password')}
                className={`w-full rounded-[var(--gridnest-radius-md)] border bg-[var(--gridnest-bg)] px-3 py-2.5 pr-10 text-sm text-[var(--gridnest-text-primary)] placeholder:text-[var(--gridnest-text-muted)] outline-none transition-colors focus:ring-2 focus:ring-[var(--gridnest-accent)] ${
                  errors.password ? 'border-[var(--gridnest-danger)]' : 'border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)]'
                }`}
              />
              <button
                type="button"
                id="reg-toggle-password"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--gridnest-text-muted)] hover:text-[var(--gridnest-text-secondary)] transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-[var(--gridnest-danger)]">{errors.password.message}</p>
            )}
          </motion.div>

          {/* Confirm Password */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
            <label htmlFor="reg-confirm" className="mb-1.5 block text-xs font-medium text-[var(--gridnest-text-primary)]">
              Confirm Password
            </label>
            <input
              id="reg-confirm"
              type="password"
              autoComplete="new-password"
              placeholder="Repeat your password"
              {...register('password2')}
              className={`w-full rounded-[var(--gridnest-radius-md)] border bg-[var(--gridnest-bg)] px-3 py-2.5 text-sm text-[var(--gridnest-text-primary)] placeholder:text-[var(--gridnest-text-muted)] outline-none transition-colors focus:ring-2 focus:ring-[var(--gridnest-accent)] ${
                errors.password2 ? 'border-[var(--gridnest-danger)]' : 'border-[var(--gridnest-border)] hover:border-[var(--gridnest-border-hover)]'
              }`}
            />
            {errors.password2 && (
              <p className="mt-1 text-xs text-[var(--gridnest-danger)]">{errors.password2.message}</p>
            )}
          </motion.div>

          {apiError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[var(--gridnest-radius-md)] border border-[var(--gridnest-danger)]/30 bg-[var(--gridnest-danger)]/10 px-3 py-2 text-xs text-[var(--gridnest-danger)]"
            >
              {apiError}
            </motion.p>
          )}

          <motion.button
            variants={shouldReduceMotion ? undefined : fadeUp}
            type="submit"
            id="register-submit"
            disabled={isSubmitting}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 h-10 rounded-[var(--gridnest-radius-md)] bg-[var(--gridnest-accent)] text-white text-sm font-medium hover:bg-[var(--gridnest-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gridnest-accent)]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <UserPlus size={14} />
            )}
            {isSubmitting ? 'Creating account…' : 'Create account'}
          </motion.button>
        </form>

        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="mt-6 text-center text-xs text-[var(--gridnest-text-muted)]">
          Already have an account?{' '}
          <Link href="/login" className="text-[var(--gridnest-accent)] hover:text-[var(--gridnest-accent-hover)] transition-colors">
            Sign in
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
