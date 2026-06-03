import React from 'react'

interface InputFieldProps {
  label: string
  type?: string
  placeholder?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error?: string
}

export default function InputField({
  label, type = 'text', placeholder, value, onChange, error
}: InputFieldProps) {
  return (
    <div className="flex flex-col gap-1 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition
          focus:ring-2 focus:ring-orange-400
          ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'}`}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </div>
  )
}