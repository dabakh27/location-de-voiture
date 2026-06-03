interface AuthButtonProps {
  label: string
  loading?: boolean
  onClick?: () => void
  type?: 'button' | 'submit'
}

export default function AuthButton({ label, loading, onClick, type = 'button' }: AuthButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className="w-full py-3 rounded-lg bg-orange-500 hover:bg-orange-600
        text-white font-semibold text-sm transition
        disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {loading ? 'Chargement...' : label}
    </button>
  )
}