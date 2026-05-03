'use client'

import { useState, useCallback, useEffect } from 'react'
import { User } from '@/types/auth.types'
import api from '@/lib/api'
import { clearTokens, isAuthenticated, setTokens } from '@/lib/auth'

export function useAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const fetchMe = useCallback(async () => {
    if (!isAuthenticated()) {
      setIsLoading(false)
      return
    }
    try {
      const { data } = await api.get<User>('/api/auth/me/')
      setUser(data)
    } catch {
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    void fetchMe()
  }, [fetchMe])

  const login = useCallback(
    async (username: string, password: string) => {
      const { data } = await api.post<{ access: string; refresh: string }>(
        '/api/auth/login/',
        { username, password }
      )
      setTokens({ access: data.access, refresh: data.refresh })
      await fetchMe()
    },
    [fetchMe]
  )

  const logout = useCallback(() => {
    clearTokens()
    setUser(null)
  }, [])

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    logout,
    refetch: fetchMe,
  }
}
