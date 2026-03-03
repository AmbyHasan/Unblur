'use client'

import Link from 'next/link'
import React from 'react'

const ErrorCard = () => {
  return (
    <div className="auth-root">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <div className="card max-w-md ">
        <div className="flex flex-col items-center gap-6 p-10! rounded-lg!">
          {/* Error Icon */}
          <div className="relative m-3!">
            <div className="absolute inset-0 bg-red-500/20 blur-xl rounded-full"></div>
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-red-900 to-red-950 flex items-center justify-center border border-red-500/30">
             <svg
  className="w-10 h-10 text-red-400"
  fill="none"
  stroke="currentColor"
  viewBox="0 0 24 24"
>
  <path
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth={2}
    d="M12 8v4m0 4h.01M10.29 3.86l-7.5 13A2 2 0 004.5 20h15a2 2 0 001.71-3.14l-7.5-13a2 2 0 00-3.42 0z"
  />
</svg>
            </div>
          </div>

          {/* Error Message */}
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">
              Oops!
            </h2>
            <p className="text-gray-300 text-sm">
              Something went wrong
            </p>
            <p className="text-gray-500 text-xs">
              We encountered an error. Please try again or go back to login.
            </p>
          </div>

          {/* Back to Login Button */}
          <Link 
            href="/auth"
            className="w-full mt-4 px-6 py-4! bg-yellow-500 hover:bg-yellow-400 text-black font-bold rounded-lg transition-all duration-200 flex items-center justify-center gap-2 group"
          >
            <span>GET BACK TO LOGIN</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>

          {/* Decorative Line */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-yellow-500/20 to-transparent mt-2"></div>
        </div>
      </div>
    </div>
  )
}

export default ErrorCard
