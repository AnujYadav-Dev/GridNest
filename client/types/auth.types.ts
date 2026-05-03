export interface User {
  id: number
  username: string
  email: string
  bio: string
  avatarUrl: string
  createdAt: string
}

export interface AuthTokens {
  access: string
  refresh: string
}

export interface LoginPayload {
  username: string
  password: string
}

export interface RegisterPayload {
  username: string
  email: string
  password: string
  password2: string
}

export interface ProfileUpdatePayload {
  bio?: string
  avatarUrl?: string
  email?: string
}

export interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
}
