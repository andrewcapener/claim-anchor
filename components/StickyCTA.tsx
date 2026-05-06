'use client'

import { useEffect, useState } from 'react'

export function StickyCTA() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const form = document.getElementById('lead-form')
    if (!form) return

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(form)
    return () => observer.disconnect()
  }, [])

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 sm:hidden bg-white border-t border-[#E5E7EB] px-4 py-3 shadow-lg">
      <a
        href="#lead-form"
        className="block w-full py-3.5 bg-[#C9922A] text-white font-semibold text-center rounded-xl hover:bg-[#b8821f] transition-colors"
      >
        Check If I Qualify — Free →
      </a>
    </div>
  )
}
