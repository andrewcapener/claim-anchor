'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { FaultStatus } from '@/types/lead'

interface Step3Props {
  onNext: (data: { faultStatus: FaultStatus; hasAttorney: boolean }) => void
}

export function Step3FaultLegal({ onNext }: Step3Props) {
  const [fault, setFault] = useState<FaultStatus | null>(null)
  const [hasAttorney, setHasAttorney] = useState<boolean | null>(null)
  const [showFaultWarning, setShowFaultWarning] = useState(false)
  const [showHardDisqualify, setShowHardDisqualify] = useState(false)

  const canContinue = fault !== null && hasAttorney !== null

  function handleContinue() {
    if (fault === null || hasAttorney === null) return

    if (fault === 'self' && !showFaultWarning) {
      setShowFaultWarning(true)
      return
    }

    onNext({ faultStatus: fault, hasAttorney })
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-1">
          A couple more questions
        </h2>
        <p className="text-sm text-[#6B7280] mb-5">
          This helps us match you with the right attorney.
        </p>

        {/* Fault */}
        <div className="mb-5">
          <p className="text-sm font-semibold text-[#374151] mb-3">Who was at fault for the accident?</p>
          <div className="space-y-2">
            {[
              { value: 'other_party' as FaultStatus, icon: '✓', label: 'The other party was at fault' },
              { value: 'partial' as FaultStatus, icon: '~', label: 'I was partially at fault' },
              { value: 'self' as FaultStatus, icon: '✗', label: 'I was at fault' },
            ].map((opt) => (
              <button
                key={opt.value}
                onClick={() => { setFault(opt.value); setShowFaultWarning(false) }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                  fault === opt.value
                    ? 'border-[#1B3A6B] bg-[#1B3A6B]/5 text-[#1B3A6B]'
                    : 'border-[#E5E7EB] hover:border-[#4A6FA5] text-[#1A1A2E]'
                }`}
              >
                <span className="w-5 text-center">{opt.icon}</span>
                {opt.label}
              </button>
            ))}
          </div>
          {showFaultWarning && (
            <p className="mt-2 text-xs text-[#C9922A] bg-[#C9922A]/10 rounded-lg px-3 py-2">
              If the other party shares any fault, you may still have a case. State laws vary — let us connect you with an attorney for a free review.
            </p>
          )}
        </div>

        {/* Attorney */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-[#374151] mb-3">Do you currently have an attorney?</p>
          <div className="space-y-2">
            <button
              onClick={() => setHasAttorney(false)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                hasAttorney === false
                  ? 'border-[#1B3A6B] bg-[#1B3A6B]/5 text-[#1B3A6B]'
                  : 'border-[#E5E7EB] hover:border-[#4A6FA5] text-[#1A1A2E]'
              }`}
            >
              <span className="w-5 text-center text-[#059669]">✓</span>
              No, I don't have an attorney
            </button>
            <button
              onClick={() => setShowHardDisqualify(true)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                hasAttorney === true
                  ? 'border-[#6B7280] bg-[#6B7280]/5 text-[#6B7280]'
                  : 'border-[#E5E7EB] hover:border-[#6B7280] text-[#1A1A2E]'
              }`}
            >
              <span className="w-5 text-center text-[#6B7280]">✗</span>
              Yes, I already have an attorney
            </button>
          </div>
        </div>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="w-full py-4 rounded-xl bg-[#C9922A] text-white font-semibold text-base hover:bg-[#b8821f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        >
          Continue →
        </button>
      </motion.div>

      <AnimatePresence>
        {showHardDisqualify && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
            >
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">
                You're already represented!
              </h3>
              <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                It looks like you're already working with an attorney — great!
                If your situation changes, we're here to help.
              </p>
              <button
                onClick={() => setShowHardDisqualify(false)}
                className="w-full py-3 px-4 bg-[#1B3A6B] text-white font-semibold rounded-xl hover:bg-[#163060] transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
