import { useState, type ReactNode } from 'react'
import { AuthContext } from './AuthContext'
import type { User } from '../types'
export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('user')
    return saved ? JSON.parse(saved) : null
  })
  function login(token: string, newUser: User) {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(newUser))
    setUser(newUser)
  }
    function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setUser(null)
  }
    return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>
    
}