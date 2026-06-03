import { useState } from 'react'
import { Link } from 'react-router-dom'
import AuthLayout from "../layouts/AuthLayout";
import InputField from '../components/auth/InputField'
import AuthButton from '../components/auth/AuthButton'

export default function ResetPasswordPage() {
  const [email, setEmail]   = useState('')
  const [sent, setSent]     = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const handleSubmit = async () => {
    if (!email) { setError('Veuillez entrer votre email.'); return }
    setError('')
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <AuthLayout>
      {sent ? (
        <div className="text-center">
          <div className="text-5xl mb-4">📧</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Email envoyé !</h1>
          <p className="text-sm text-gray-500 mb-6">
            Un lien de réinitialisation a été envoyé à <strong>{email}</strong>.
            Vérifiez aussi vos spams.
          </p>
          <Link to="/login" className="text-orange-500 hover:underline text-sm font-medium">
            ← Retour à la connexion
          </Link>
        </div>
      ) : (
        <>
          <Link to="/login" className="text-sm text-gray-400 hover:text-orange-500 flex items-center gap-1 mb-6">
            ← Retour
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">Mot de passe oublié ?</h1>
          <p className="text-sm text-gray-500 mb-8">
            Entrez votre email et nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>

          <div className="flex flex-col gap-4">
            <InputField
              label="Email"
              type="email"
              placeholder="vous@exemple.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              error={error}
            />
            <AuthButton label="Envoyer le lien" loading={loading} onClick={handleSubmit} />
          </div>
        </>
      )}
    </AuthLayout>
  )
}