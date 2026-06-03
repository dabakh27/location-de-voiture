
import { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextType {
  isAuthenticated: boolean
  user: { name: string; email: string } | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ name: string; email: string } | null>(
    () => {
      const saved = localStorage.getItem('auth_user')
      return saved ? JSON.parse(saved) : null
    }
  )

  const login = (email: string, password: string): boolean => {
    
    if (email && password.length >= 6) {
      const mockUser = { name: 'Client Demo', email }
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