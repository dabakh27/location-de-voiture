import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from "../layouts/AuthLayout";
import InputField from '../components/auth/InputField'
import AuthButton from '../components/auth/AuthButton'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail]       = useState('')
  const [password, setPassword] = useState('')
  const [error, setError]       = useState('')
  const [loading, setLoading]   = useState(false)

  const handleSubmit = async () => {
    setError('')
    if (!email || !password) {
      setError('Veuillez remplir tous les champs.')
      return
    }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800)) // simulate API
    const ok = login(email, password)
    setLoading(false)
    if (ok) {
      navigate('/dashboard')
    } else {
      setError('Email ou mot de passe incorrect.')
    }
  }

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Connexion</h1>
      <p className="text-sm text-gray-500 mb-8">
        Pas encore de compte ?{' '}
        <Link to="/register" className="text-orange-500 hover:underline font-medium">
          S'inscrire
        </Link>
      </p>

      <div className="flex flex-col gap-4">
        <InputField
          label="Email"
          type="email"
          placeholder="vous@exemple.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <InputField
          label="Mot de passe"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <div className="flex justify-end">
          <Link to="/reset-password" className="text-xs text-orange-500 hover:underline">
            Mot de passe oublié ?
          </Link>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
            {error}
          </div>
        )}

        <AuthButton label="Se connecter" loading={loading} onClick={handleSubmit} />
      </div>
    </AuthLayout>
  )
}