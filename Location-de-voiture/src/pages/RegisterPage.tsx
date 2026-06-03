import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthLayout from "../layouts/AuthLayout";
import InputField from '../components/auth/InputField'
import AuthButton from '../components/auth/AuthButton'
import { useAuth } from '../context/AuthContext'

export default function RegisterPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', password: '', confirm: ''
  })
  const [cgu, setCgu]       = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.firstName) e.firstName = 'Prénom requis'
    if (!form.lastName)  e.lastName  = 'Nom requis'
    if (!form.email)     e.email     = 'Email requis'
    if (form.password.length < 6) e.password = 'Minimum 6 caractères'
    if (form.password !== form.confirm) e.confirm = 'Les mots de passe ne correspondent pas'
    if (!cgu) e.cgu = 'Vous devez accepter les CGU'
    return e
  }

  const handleSubmit = async () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length > 0) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login(form.email, form.password) // auto-login après inscription
    setLoading(false)
    navigate('/dashboard')
  }

  const f = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  return (
    <AuthLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-1">Créer un compte</h1>
      <p className="text-sm text-gray-500 mb-6">
        Déjà inscrit ?{' '}
        <Link to="/login" className="text-orange-500 hover:underline font-medium">Se connecter</Link>
      </p>

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <InputField label="Prénom" value={form.firstName} onChange={f('firstName')} error={errors.firstName} />
          <InputField label="Nom"    value={form.lastName}  onChange={f('lastName')}  error={errors.lastName} />
        </div>
        <InputField label="Email" type="email" placeholder="vous@exemple.com" value={form.email} onChange={f('email')} error={errors.email} />
        <InputField label="Mot de passe" type="password" placeholder="Min. 6 caractères" value={form.password} onChange={f('password')} error={errors.password} />
        <InputField label="Confirmer le mot de passe" type="password" placeholder="••••••••" value={form.confirm} onChange={f('confirm')} error={errors.confirm} />

        <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer">
          <input type="checkbox" checked={cgu} onChange={e => setCgu(e.target.checked)} className="mt-0.5 accent-orange-500" />
          <span>J'accepte les <span className="text-orange-500 underline">conditions générales d'utilisation</span></span>
        </label>
        {errors.cgu && <span className="text-xs text-red-500">{errors.cgu}</span>}

        <AuthButton label="Créer mon compte" loading={loading} onClick={handleSubmit} />
      </div>
    </AuthLayout>
  )
}