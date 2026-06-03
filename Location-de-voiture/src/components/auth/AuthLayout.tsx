import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface AuthLayoutProps {
  children: ReactNode
  imageUrl?: string
}

export default function AuthLayout({ children, imageUrl }: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex">
      {/* Côté gauche — visuel voiture */}
      <div
        className="hidden lg:flex lg:w-1/2 bg-cover bg-center relative"
        style={{ backgroundImage: `url(${imageUrl ?? 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200'})` }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 flex flex-col justify-end p-12 text-white">
          <Link to="/" className="flex items-center gap-2 mb-auto">
            <span className="text-2xl font-bold text-orange-400">🚗 DriveEasy</span>
          </Link>
          <h2 className="text-4xl font-bold leading-tight mb-3">
            Louez la voiture<br/>de vos rêves
          </h2>
          <p className="text-white/70 text-sm">
            Des milliers de véhicules disponibles. Réservation en 2 minutes.
          </p>
        </div>
      </div>

      {/* Côté droit — formulaire */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Logo mobile */}
          <Link to="/" className="lg:hidden flex items-center gap-2 mb-8">
            <span className="text-xl font-bold text-orange-500">🚗 DriveEasy</span>
          </Link>
          {children}
        </div>
      </div>
    </div>
  )
}