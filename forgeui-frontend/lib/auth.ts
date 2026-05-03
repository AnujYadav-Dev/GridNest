import { AuthTokens } from '@/types/auth.types'

const ACCESS_KEY = 'forge_access'
const REFRESH_KEY = 'forge_refresh'

function isBrowser(): boolean {
  return typeof window !== 'undefined'
}

export function getAccessToken(): string | null {
  if (!isBrowser()) return null
  return localStorage.getItem(ACCESS_KEY)
}

export function getRefreshToken(): string | null {
  if (!isBrowser()) return null
  return localStorage.getItem(REFRESH_KEY)
}

export function setTokens(tokens: AuthTokens): void {
  if (!isBrowser()) return
  localStorage.setItem(ACCESS_KEY, tokens.access)
  localStorage.setItem(REFRESH_KEY, tokens.refresh)
}

export function clearTokens(): void {
  if (!isBrowser()) return
  localStorage.removeItem(ACCESS_KEY)
  localStorage.removeItem(REFRESH_KEY)
}

export function isAuthenticated(): boolean {
  return !!getAccessToken()
}
