"use client"

import type React from "react"

interface WinxButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: "magic" | "bloom" | "stella" | "flora" | "musa" | "tecna" | "aisha"
  className?: string
}

export function WinxButton({ children, variant = "magic", className = "", ...props }: WinxButtonProps) {
  const baseClasses = `
    font-medium text-base
    px-6 py-3 rounded-2xl
    transition-all duration-300 ease-out
    hover:scale-[1.02] active:scale-[0.98]
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
    relative overflow-hidden
    magic-glow-hover
  `

  const getVariantClasses = () => {
    switch (variant) {
      case "bloom":
        return "bg-gradient-to-r from-orange-400 to-red-400 text-white border border-orange-300/50"
      case "stella":
        return "bg-gradient-to-r from-yellow-400 to-orange-400 text-white border border-yellow-300/50"
      case "flora":
        return "bg-gradient-to-r from-pink-400 to-rose-400 text-white border border-pink-300/50"
      case "musa":
        return "bg-gradient-to-r from-red-400 to-pink-400 text-white border border-red-300/50"
      case "tecna":
        return "bg-gradient-to-r from-purple-400 to-indigo-400 text-white border border-purple-300/50"
      case "aisha":
        return "bg-gradient-to-r from-blue-400 to-cyan-400 text-white border border-blue-300/50"
      default:
        return "bg-gradient-to-r from-violet-500 to-purple-600 text-white border border-violet-400/50"
    }
  }

  return (
    <button className={`${baseClasses} ${getVariantClasses()} ${className}`} {...props}>
      <span className="relative z-10">{children}</span>
    </button>
  )
}
