import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

export interface User {
  name: string
  email: string
}

interface AuthContextType {
  isAuthenticated: boolean
  user: User | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(
    () => {
      const saved = localStorage.getItem('auth_user')
      try {
        return saved ? JSON.parse(saved) : null
      } catch (error) {
        console.error("Erreur de parsing auth_user:", error)
        return null
      }
    }
  )

  const login = (email: string, password: string): boolean => {
    
    if (email && password.length >= 6) {
      const mockUser: User = { name: 'Client Demo', email }
      setUser(mockUser)
      localStorage.setItem('auth_user', JSON.stringify(mockUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth_user')
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth doit être utilisé dans AuthProvider')
  return ctx
}