'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import type { AccidentType, AccidentTimeframe, MedicalTreatment } from '@/types/lead'

interface Step2Props {
  onNext: (data: {
    accidentType: AccidentType
    accidentTimeframe: AccidentTimeframe
    medicalTreatment: MedicalTreatment
  }) => void
}

const ACCIDENT_TYPES: { value: AccidentType; icon: string; label: string }[] = [
  { value: 'car_accident', icon: '🚗', label: 'Car Accident' },
  { value: 'truck_commercial', icon: '🚛', label: 'Truck / Commercial' },
  { value: 'motorcycle', icon: '🏍️', label: 'Motorcycle' },
  { value: 'pedestrian_bicycle', icon: '🚶', label: 'Pedestrian / Bicycle' },
  { value: 'slip_fall', icon: '🏢', label: 'Slip & Fall' },
  { value: 'other', icon: '⚡', label: 'Other / Not Sure' },
]

const TIMEFRAMES: { value: AccidentTimeframe; label: string }[] = [
  { value: 'within_30_days', label: 'Within the last 30 days' },
  { value: '1_6_months', label: '1–6 months ago' },
  { value: '6_12_months', label: '6–12 months ago' },
  { value: 'over_1_year', label: 'Over 1 year ago' },
]

export function Step2AccidentDetails({ onNext }: Step2Props) {
  const [accidentType, setAccidentType] = useState<AccidentType | null>(null)
  const [timeframe, setTimeframe] = useState<AccidentTimeframe | null>(null)
  const [medical, setMedical] = useState<MedicalTreatment | null>(null)
  const [showOldWarning, setShowOldWarning] = useState(false)
  const [showMedWarning, setShowMedWarning] = useState(false)

  const canContinue = accidentType && timeframe && medical

  function handleContinue() {
    if (!accidentType || !timeframe || !medical) return

    if (timeframe === 'over_1_year' && !showOldWarning) {
      setShowOldWarning(true)
      return
    }
    if (medical === 'no' && !showMedWarning) {
      setShowMedWarning(true)
      return
    }

    onNext({ accidentType, accidentTimeframe: timeframe, medicalTreatment: medical })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-[#1A1A2E] mb-1">
        Tell us about your accident
      </h2>
      <p className="text-sm text-[#6B7280] mb-5">
        A few quick questions to understand your situation.
      </p>

      {/* Accident type */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[#374151] mb-3">What type of accident were you in?</p>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {ACCIDENT_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() => setAccidentType(t.value)}
              className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-xl border-2 transition-all duration-200 text-center ${
                accidentType === t.value
                  ? 'border-[#1B3A6B] bg-[#1B3A6B]/5'
                  : 'border-[#E5E7EB] hover:border-[#4A6FA5] hover:bg-[#F8F9FC]'
              }`}
            >
              <span className="text-2xl">{t.icon}</span>
              <span className="text-xs font-medium text-[#1A1A2E] leading-tight">{t.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Timeframe */}
      <div className="mb-5">
        <p className="text-sm font-semibold text-[#374151] mb-3">When did the accident happen?</p>
        <div className="space-y-2">
          {TIMEFRAMES.map((t) => (
            <button
              key={t.value}
              onClick={() => { setTimeframe(t.value); setShowOldWarning(false) }}
              className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 ${
                timeframe === t.value
                  ? 'border-[#1B3A6B] bg-[#1B3A6B]/5 text-[#1B3A6B]'
                  : 'border-[#E5E7EB] hover:border-[#4A6FA5] text-[#1A1A2E]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {showOldWarning && (
          <p className="mt-2 text-xs text-[#C9922A] bg-[#C9922A]/10 rounded-lg px-3 py-2">
            Cases older than 1 year may still qualify depending on your state. Let's check — it takes 30 seconds.
          </p>
        )}
      </div>

      {/* Medical treatment */}
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#374151] mb-3">Did you receive medical treatment?</p>
        <div className="space-y-2">
          {[
            { value: 'yes' as MedicalTreatment, icon: '✓', label: 'Yes, I saw a doctor or went to the hospital' },
            { value: 'not_yet' as MedicalTreatment, icon: '○', label: 'Not yet, but I plan to' },
            { value: 'no' as MedicalTreatment, icon: '✗', label: 'No medical treatment' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => { setMedical(opt.value); setShowMedWarning(false) }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 text-sm font-medium transition-all duration-200 text-left ${
                medical === opt.value
                  ? 'border-[#1B3A6B] bg-[#1B3A6B]/5 text-[#1B3A6B]'
                  : 'border-[#E5E7EB] hover:border-[#4A6FA5] text-[#1A1A2E]'
              }`}
            >
              <span className="w-5 text-center">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>
        {showMedWarning && (
          <p className="mt-2 text-xs text-[#C9922A] bg-[#C9922A]/10 rounded-lg px-3 py-2">
            Medical documentation significantly strengthens your case. We still recommend a free review.
          </p>
        )}
      </div>

      <button
        onClick={handleContinue}
        disabled={!canContinue}
        className="w-full py-4 rounded-xl bg-[#C9922A] text-white font-semibold text-base hover:bg-[#b8821f] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        Continue →
      </button>
    </motion.div>
  )
}
