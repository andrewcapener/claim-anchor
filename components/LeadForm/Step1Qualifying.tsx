'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Step1Props {
  onNext: (wasInjured: boolean) => void
}

export function Step1Qualifying({ onNext }: Step1Props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-[#1A1A2E] mb-2">
          Were you injured in an accident?
        </h2>
        <p className="text-sm text-[#6B7280] mb-6">
          Your answer helps us understand how we can help.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => onNext(true)}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-[#E5E7EB] hover:border-[#1B3A6B] hover:bg-[#F8F9FC] transition-all duration-200 text-left group"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#059669]/10 flex items-center justify-center text-[#059669] font-bold">
              ✓
            </span>
            <span className="font-medium text-[#1A1A2E] group-hover:text-[#1B3A6B]">
              Yes, I was injured
            </span>
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="w-full flex items-center gap-3 px-5 py-4 rounded-xl border-2 border-[#E5E7EB] hover:border-[#6B7280] hover:bg-[#F8F9FC] transition-all duration-200 text-left group"
          >
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#6B7280]/10 flex items-center justify-center text-[#6B7280] font-bold">
              ✗
            </span>
            <span className="font-medium text-[#6B7280]">No / Not sure</span>
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-bold text-[#1A1A2E] mb-3">
                You may still qualify
              </h3>
              <p className="text-sm text-[#6B7280] mb-5 leading-relaxed">
                Even if you're unsure about your injuries, you may still qualify.
                Many accident victims don't feel pain until days later.
                Would you like a free review anyway?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => { setShowModal(false); onNext(false) }}
                  className="w-full py-3 px-4 bg-[#1B3A6B] text-white font-semibold rounded-xl hover:bg-[#163060] transition-colors"
                >
                  Yes, review my case
                </button>
                <button
                  onClick={() => { window.location.href = 'https://google.com' }}
                  className="w-full py-3 px-4 text-[#6B7280] font-medium rounded-xl hover:bg-[#F8F9FC] transition-colors"
                >
                  No thanks
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
