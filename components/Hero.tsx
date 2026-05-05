'use client'

import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/ui/Logo'
import { PhoneButton } from '@/components/ui/PhoneButton'
import { LeadForm } from '@/components/LeadForm'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '1-800-CLAIM-NOW'
const TARGET_COUNT = 12400

function useCountUp(target: number, duration = 2000) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const start = Date.now()
          const tick = () => {
            const elapsed = Date.now() - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [target, duration])

  return { count, ref }
}

export function Hero() {
  const { count, ref } = useCountUp(TARGET_COUNT)

  return (
    <section id="lead-form" className="relative bg-white overflow-hidden">
      {/* Subtle bg texture */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-[0.025] pointer-events-none select-none" aria-hidden="true">
        <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M300 30 L300 570 M60 300 L540 300" stroke="#1B3A6B" strokeWidth="60" strokeLinecap="round"/>
          <circle cx="300" cy="300" r="260" stroke="#1B3A6B" strokeWidth="30"/>
          <path d="M120 510 Q300 600 480 510" stroke="#1B3A6B" strokeWidth="30" fill="none" strokeLinecap="round"/>
        </svg>
      </div>

      {/* Nav */}
      <div className="relative z-10 flex items-center justify-between px-5 sm:px-8 lg:px-12 py-4 max-w-7xl mx-auto">
        <Logo />
        <a href={`tel:${PHONE.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold text-[#1B3A6B] hover:text-[#4A6FA5] transition-colors hidden sm:block">
          {PHONE}
        </a>
      </div>

      {/* 2-column layout */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 pb-10 lg:pb-16 lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">

        {/* LEFT — copy */}
        <div className="pt-6 lg:pt-10 lg:sticky lg:top-8">
          <div className="inline-flex items-center gap-2 bg-[#1B3A6B]/8 rounded-full px-3 py-1.5 mb-5">
            <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse"></span>
            <span className="text-xs font-semibold text-[#1B3A6B]">Free case review — no obligation</span>
          </div>

          <h1 className="text-[34px] sm:text-[42px] lg:text-[48px] xl:text-[54px] font-bold text-[#1B3A6B] leading-[1.1] mb-4">
            Were You Hurt<br className="hidden sm:block" /> in an Accident?
            <span className="block text-[#1A1A2E] mt-1">You May Be Owed<br className="hidden sm:block" /> Compensation.</span>
          </h1>

          <p className="text-lg sm:text-xl text-[#6B7280] mb-6 leading-relaxed max-w-md">
            Find out in 60 seconds if you qualify. Our network of attorneys
            has helped recover millions for accident victims — at no upfront cost.
          </p>

          {/* Trust strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#6B7280] mb-6">
            <span className="flex items-center gap-1.5"><span className="text-[#059669] font-bold">✓</span> No upfront costs, ever</span>
            <span className="flex items-center gap-1.5"><span className="text-[#059669] font-bold">✓</span> 60-second eligibility check</span>
            <span className="flex items-center gap-1.5"><span className="text-[#059669] font-bold">✓</span> Response in minutes</span>
          </div>

          {/* Count-up */}
          <div ref={ref} className="flex items-center gap-3 mb-8">
            <div className="flex -space-x-2">
              {['MT','JR','SK','MD'].map((initials, i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ backgroundColor: ['#1B3A6B','#4A6FA5','#C9922A','#059669'][i] }}>
                  {initials}
                </div>
              ))}
            </div>
            <p className="text-sm text-[#6B7280]">
              <strong className="text-[#1B3A6B] font-bold">{count.toLocaleString()}+</strong>{' '}
              accident victims helped
            </p>
          </div>

          {/* Average recovery callout */}
          <div className="hidden lg:flex items-start gap-3 bg-[#F8F9FC] rounded-xl p-4 border border-[#E5E7EB] max-w-sm">
            <span className="text-2xl">⚖️</span>
            <div>
              <p className="text-sm font-bold text-[#1A1A2E]">Attorneys recover 3.5× more</p>
              <p className="text-xs text-[#6B7280] mt-0.5">Accident victims with legal representation receive significantly higher settlements on average than those without.</p>
            </div>
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="mt-8 lg:mt-10">
          <LeadForm />
          {/* Mobile phone CTA */}
          <div className="mt-4 text-center sm:hidden">
            <a href={`tel:${PHONE.replace(/[^0-9+]/g, '')}`} className="text-sm font-semibold text-[#1B3A6B]">
              Prefer to call? {PHONE}
            </a>
          </div>
        </div>

      </div>
    </section>
  )
}
