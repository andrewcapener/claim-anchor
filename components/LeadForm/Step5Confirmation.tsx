'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { trackLeadSubmit } from '@/lib/analytics'

interface Step5Props {
  firstName: string
  phone: string
  state: string
}

export function Step5Confirmation({ firstName, phone, state }: Step5Props) {
  const displayPhone = process.env.NEXT_PUBLIC_PHONE ?? '1-800-CLAIM-NOW'

  useEffect(() => {
    trackLeadSubmit(state)
  }, [state])

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="text-center py-2"
    >
      {/* Animated checkmark */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
        className="mx-auto mb-5 w-16 h-16 rounded-full bg-[#059669]/10 flex items-center justify-center"
      >
        <motion.svg
          viewBox="0 0 24 24"
          className="w-9 h-9 text-[#059669]"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <motion.path
            d="M5 13l4 4L19 7"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          />
        </motion.svg>
      </motion.div>

      <h2 className="text-2xl font-bold text-[#1A1A2E] mb-2">
        You're All Set, {firstName}!
      </h2>
      <p className="text-sm text-[#6B7280] mb-4 leading-relaxed">
        A legal specialist will contact you within the next few minutes at{' '}
        <strong className="text-[#1A1A2E]">{phone}</strong>. Keep your phone nearby.
      </p>

      <div className="bg-[#F8F9FC] rounded-xl p-4 mb-6 text-left">
        <p className="text-sm font-semibold text-[#374151] mb-2">What to expect:</p>
        <ul className="space-y-2">
          {[
            'A brief call to discuss the details of your accident',
            'An honest assessment of your case — completely free',
            'No obligation, no upfront costs — ever',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-[#6B7280]">
              <span className="text-[#059669] font-bold mt-0.5">•</span>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a
        href={`tel:${displayPhone.replace(/[^0-9+]/g, '')}`}
        className="block w-full py-4 rounded-xl bg-[#1B3A6B] text-white font-semibold text-base hover:bg-[#163060] transition-colors"
      >
        Get Help Now — Call {displayPhone}
      </a>
    </motion.div>
  )
}
