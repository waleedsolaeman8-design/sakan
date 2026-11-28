import { createContext } from 'react'
import type { User } from '../types'
export type AuthContextValue = {
  user: User | null
  login: (token: string, user: User) => void
  logout: () => void
}
export const AuthContext = createContext<AuthContextValue | null>(null)