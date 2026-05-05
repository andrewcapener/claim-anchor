'use client'

import { useState } from 'react'

export function UrgencyBar() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className="bg-[#1B3A6B] text-white text-center px-4 py-2.5 flex items-center justify-center gap-3 relative">
      <span className="text-sm">
        <span className="font-semibold">⏱ Time-sensitive:</span>{' '}
        Every state has a statute of limitations on accident claims.{' '}
        <a href="#lead-form" className="underline underline-offset-2 font-semibold hover:text-[#C9922A] transition-colors">
          Check your eligibility now — it takes 60 seconds.
        </a>
      </span>
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors p-1"
        aria-label="Dismiss"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
          <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"/>
        </svg>
      </button>
    </div>
  )
}
