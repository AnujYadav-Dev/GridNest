'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { motion, useReducedMotion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { staggerContainer, fadeUp } from '@/lib/motion'
import api from '@/lib/api'
import { setTokens } from '@/lib/auth'

const schema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
})

type FormValues = z.infer<typeof schema>

import { Suspense } from 'react'

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const from = searchParams.get('from') ?? '/dashboard'
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
      const res = await api.post<{ access: string; refresh: string }>('/api/auth/login/', data)
      setTokens({ access: res.data.access, refresh: res.data.refresh })
      // Also set cookie for middleware
      document.cookie = `forge_access=${res.data.access}; path=/; max-age=3600; SameSite=Lax`
      router.push(from)
    } catch {
      setApiError('Invalid username or password.')
    }
  }

  return (
    <motion.div
      variants={shouldReduceMotion ? undefined : staggerContainer}
      initial="hidden"
      animate="visible"
      className="w-full max-w-sm"
    >
      {/* Card */}
      <motion.div
        variants={shouldReduceMotion ? undefined : fadeUp}
        className="rounded-[var(--forge-radius-xl)] border border-[var(--forge-border)] bg-[var(--forge-surface)] p-8 shadow-[var(--forge-shadow-md)]"
      >
        <motion.div variants={shouldReduceMotion ? undefined : fadeUp} className="mb-8">
          <h1 className="font-sans text-2xl font-bold text-[var(--forge-text-primary)] tracking-tight mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-[var(--forge-text-secondary)]">
            Sign in to your ForgeUI account
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
          {/* Username */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
            <label htmlFor="login-username" className="mb-1.5 block text-xs font-medium text-[var(--forge-text-primary)]">
              Username
            </label>
            <input
              id="login-username"
              type="text"
              autoComplete="username"
              placeholder="your_username"
              {...register('username')}
              className={`w-full rounded-[var(--forge-radius-md)] border bg-[var(--forge-bg)] px-3 py-2.5 text-sm text-[var(--forge-text-primary)] placeholder:text-[var(--forge-text-muted)] outline-none transition-colors focus:ring-2 focus:ring-[var(--forge-accent)] ${
                errors.username ? 'border-[var(--forge-danger)]' : 'border-[var(--forge-border)] hover:border-[var(--forge-border-hover)]'
              }`}
            />
            {errors.username && (
              <p className="mt-1 text-xs text-[var(--forge-danger)]">{errors.username.message}</p>
            )}
          </motion.div>

          {/* Password */}
          <motion.div variants={shouldReduceMotion ? undefined : fadeUp}>
            <label htmlFor="login-password" className="mb-1.5 block text-xs font-medium text-[var(--forge-text-primary)]">
              Password
            </label>
            <div className="relative">
              <input
                id="login-password"
                type={showPass ? 'text' : 'password'}
                autoComplete="current-password"
                placeholder="••••••••"
                {...register('password')}
                className={`w-full rounded-[var(--forge-radius-md)] border bg-[var(--forge-bg)] px-3 py-2.5 pr-10 text-sm text-[var(--forge-text-primary)] placeholder:text-[var(--forge-text-muted)] outline-none transition-colors focus:ring-2 focus:ring-[var(--forge-accent)] ${
                  errors.password ? 'border-[var(--forge-danger)]' : 'border-[var(--forge-border)] hover:border-[var(--forge-border-hover)]'
                }`}
              />
              <button
                type="button"
                id="toggle-password-visibility"
                onClick={() => setShowPass((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--forge-text-muted)] hover:text-[var(--forge-text-secondary)] transition-colors"
                aria-label={showPass ? 'Hide password' : 'Show password'}
              >
                {showPass ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="mt-1 text-xs text-[var(--forge-danger)]">{errors.password.message}</p>
            )}
          </motion.div>

          {/* API error */}
          {apiError && (
            <motion.p
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-[var(--forge-radius-md)] border border-[var(--forge-danger)]/30 bg-[var(--forge-danger)]/10 px-3 py-2 text-xs text-[var(--forge-danger)]"
            >
              {apiError}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            variants={shouldReduceMotion ? undefined : fadeUp}
            type="submit"
            id="login-submit"
            disabled={isSubmitting}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
            className="flex w-full items-center justify-center gap-2 h-10 rounded-[var(--forge-radius-md)] bg-[var(--forge-accent)] text-white text-sm font-medium hover:bg-[var(--forge-accent-hover)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--forge-accent)]"
          >
            {isSubmitting ? (
              <span className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white animate-spin" />
            ) : (
              <LogIn size={14} />
            )}
            {isSubmitting ? 'Signing in…' : 'Sign in'}
          </motion.button>
        </form>

        <motion.p variants={shouldReduceMotion ? undefined : fadeUp} className="mt-6 text-center text-xs text-[var(--forge-text-muted)]">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-[var(--forge-accent)] hover:text-[var(--forge-accent-hover)] transition-colors">
            Create one
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex h-40 w-full items-center justify-center">
        <div className="h-8 w-8 rounded-full border-4 border-[var(--forge-accent-subtle)] border-t-[var(--forge-accent)] animate-spin" />
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
