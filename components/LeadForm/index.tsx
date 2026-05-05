'use client'

import { useState, useEffect, useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ProgressBar } from './ProgressBar'
import { Step1Qualifying } from './Step1Qualifying'
import { Step2AccidentDetails } from './Step2AccidentDetails'
import { Step3FaultLegal } from './Step3FaultLegal'
import { Step4Contact } from './Step4Contact'
import { Step5Confirmation } from './Step5Confirmation'
import type { LeadFormData } from '@/types/lead'
import { trackFormStep } from '@/lib/analytics'
import type { z } from 'zod'
import type { contactSchema } from '@/lib/schema'

type ContactData = z.infer<typeof contactSchema>

const STORAGE_KEY = 'ca_form_progress'
const TOTAL_STEPS = 5

type PartialLead = Partial<LeadFormData>

interface StoredProgress {
  step: number
  data: PartialLead
  utmSource?: string
  utmMedium?: string
  utmCampaign?: string
  trustedformCertUrl?: string
}

function readUtm() {
  if (typeof window === 'undefined') return {}
  const p = new URLSearchParams(window.location.search)
  return {
    utmSource: p.get('utm_source') ?? undefined,
    utmMedium: p.get('utm_medium') ?? undefined,
    utmCampaign: p.get('utm_campaign') ?? undefined,
  }
}

function readTrustedForm(): string {
  if (typeof window === 'undefined') return ''
  const el = document.getElementById('xxTrustedFormCertUrl') as HTMLInputElement | null
  return el?.value ?? ''
}

export function LeadForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<PartialLead>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [utm, setUtm] = useState<{ utmSource?: string; utmMedium?: string; utmCampaign?: string }>({})
  const [detectedState, setDetectedState] = useState<string | null>(null)

  // Restore session progress
  useEffect(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: StoredProgress = JSON.parse(stored)
        if (parsed.step && parsed.step > 1 && parsed.step < 5) {
          setStep(parsed.step)
          setFormData(parsed.data ?? {})
        }
      }
    } catch {}
    setUtm(readUtm())
    fetch('/api/detect-state')
      .then((r) => r.json())
      .then((d) => { if (d.state) setDetectedState(d.state) })
      .catch(() => {})
  }, [])

  const saveProgress = useCallback((s: number, data: PartialLead) => {
    try {
      const entry: StoredProgress = { step: s, data, ...readUtm() }
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(entry))
    } catch {}
  }, [])

  function advance(s: number, data: PartialLead) {
    const next = s + 1
    const merged = { ...formData, ...data }
    setFormData(merged)
    setStep(next)
    saveProgress(next, merged)
    trackFormStep(next)
  }

  async function handleContactSubmit(contactData: ContactData) {
    setIsSubmitting(true)
    const merged = { ...formData, ...contactData } as PartialLead

    try {
      await fetch('/api/submit-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...merged,
          trustedformCertUrl: readTrustedForm(),
          ...utm,
        }),
      })
    } catch {
      // fail silently to user — always show confirmation
    }

    setFormData(merged)
    setStep(5)
    sessionStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div
      id="lead-form"
      className="bg-white rounded-2xl shadow-[0_4px_32px_rgba(0,0,0,0.08)] border border-[#E5E7EB] max-w-[560px] mx-auto p-6 sm:p-8"
    >
      {step < 5 && <ProgressBar step={step} total={TOTAL_STEPS} />}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1Qualifying
            key="step1"
            onNext={(wasInjured) => advance(1, { wasInjured })}
          />
        )}
        {step === 2 && (
          <Step2AccidentDetails
            key="step2"
            onNext={(d) => advance(2, d)}
          />
        )}
        {step === 3 && (
          <Step3FaultLegal
            key="step3"
            onNext={(d) => advance(3, d)}
          />
        )}
        {step === 4 && (
          <Step4Contact
            key="step4"
            onNext={handleContactSubmit}
            isSubmitting={isSubmitting}
            detectedState={detectedState}
          />
        )}
        {step === 5 && (
          <Step5Confirmation
            key="step5"
            firstName={formData.firstName ?? ''}
            phone={formData.phone ?? ''}
            state={formData.state ?? ''}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
