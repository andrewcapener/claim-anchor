'use client'

import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { contactSchema } from '@/lib/schema'
import type { z } from 'zod'

type ContactFormData = z.infer<typeof contactSchema>

interface Step4Props {
  onNext: (data: ContactFormData) => void
  isSubmitting: boolean
  detectedState?: string | null
}

const US_STATES = [
  'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
  'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
  'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
  'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
  'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY',
]

const STATE_NAMES: Record<string, string> = {
  AL:'Alabama',AK:'Alaska',AZ:'Arizona',AR:'Arkansas',CA:'California',
  CO:'Colorado',CT:'Connecticut',DE:'Delaware',FL:'Florida',GA:'Georgia',
  HI:'Hawaii',ID:'Idaho',IL:'Illinois',IN:'Indiana',IA:'Iowa',
  KS:'Kansas',KY:'Kentucky',LA:'Louisiana',ME:'Maine',MD:'Maryland',
  MA:'Massachusetts',MI:'Michigan',MN:'Minnesota',MS:'Mississippi',MO:'Missouri',
  MT:'Montana',NE:'Nebraska',NV:'Nevada',NH:'New Hampshire',NJ:'New Jersey',
  NM:'New Mexico',NY:'New York',NC:'North Carolina',ND:'North Dakota',OH:'Ohio',
  OK:'Oklahoma',OR:'Oregon',PA:'Pennsylvania',RI:'Rhode Island',SC:'South Carolina',
  SD:'South Dakota',TN:'Tennessee',TX:'Texas',UT:'Utah',VT:'Vermont',
  VA:'Virginia',WA:'Washington',WV:'West Virginia',WI:'Wisconsin',WY:'Wyoming',
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, '').slice(0, 10)
  if (digits.length <= 3) return digits.length ? `(${digits}` : ''
  if (digits.length <= 6) return `(${digits.slice(0,3)}) ${digits.slice(3)}`
  return `(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`
}

export function Step4Contact({ onNext, isSubmitting, detectedState }: Step4Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { state: detectedState ?? '' },
  })

  // Apply detected state if it arrives after mount
  useEffect(() => {
    if (detectedState) {
      setValue('state', detectedState, { shouldValidate: false })
    }
  }, [detectedState, setValue])

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue('phone', formatPhone(e.target.value), { shouldValidate: true })
  }

  const phone = watch('phone') ?? ''
  const selectedState = watch('state')

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-bold text-[#1A1A2E] mb-1">
        Where should we send your case review?
      </h2>
      <p className="text-sm text-[#6B7280] mb-5">
        A legal specialist will contact you within minutes.
      </p>

      <form onSubmit={handleSubmit(onNext)} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">First Name</label>
            <input
              {...register('firstName')}
              type="text"
              autoComplete="given-name"
              autoFocus
              placeholder="Jane"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
                errors.firstName ? 'border-red-400' : 'border-[#E5E7EB] focus:border-[#1B3A6B]'
              }`}
            />
            {errors.firstName && <p className="mt-1 text-xs text-red-500">{errors.firstName.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-[#374151] mb-1.5">Last Name</label>
            <input
              {...register('lastName')}
              type="text"
              autoComplete="family-name"
              placeholder="Smith"
              className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
                errors.lastName ? 'border-red-400' : 'border-[#E5E7EB] focus:border-[#1B3A6B]'
              }`}
            />
            {errors.lastName && <p className="mt-1 text-xs text-red-500">{errors.lastName.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">Phone Number</label>
          <input
            type="tel"
            autoComplete="tel"
            placeholder="(555) 555-5555"
            value={phone}
            onChange={handlePhoneChange}
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
              errors.phone ? 'border-red-400' : 'border-[#E5E7EB] focus:border-[#1B3A6B]'
            }`}
          />
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">Email Address</label>
          <input
            {...register('email')}
            type="email"
            autoComplete="email"
            placeholder="jane@email.com"
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-colors ${
              errors.email ? 'border-red-400' : 'border-[#E5E7EB] focus:border-[#1B3A6B]'
            }`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>

        {/* State — pre-filled with IP detection */}
        <div>
          <label className="block text-sm font-medium text-[#374151] mb-1.5">
            State
            {detectedState && (
              <span className="ml-2 text-xs font-normal text-[#059669]">
                ✓ Auto-detected — {STATE_NAMES[detectedState] ?? detectedState}
              </span>
            )}
          </label>
          <select
            {...register('state')}
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm bg-white transition-colors ${
              errors.state
                ? 'border-red-400'
                : selectedState
                ? 'border-[#059669] bg-[#059669]/5'
                : 'border-[#E5E7EB] focus:border-[#1B3A6B]'
            }`}
          >
            <option value="">Select your state</option>
            {US_STATES.map((s) => (
              <option key={s} value={s}>{STATE_NAMES[s] ?? s}</option>
            ))}
          </select>
          {errors.state && <p className="mt-1 text-xs text-red-500">{errors.state.message}</p>}
        </div>

        {/* TCPA Consent */}
        <div className="pt-1">
          <label className="flex gap-3 cursor-pointer">
            <div className="flex-shrink-0 mt-0.5">
              <input
                {...register('tcpaConsent')}
                type="checkbox"
                className="w-4 h-4 rounded border-2 border-[#D1D5DB] accent-[#1B3A6B] cursor-pointer"
              />
            </div>
            <p className="text-[11px] text-[#6B7280] leading-relaxed">
              By checking this box and clicking 'Submit My Case', I agree to the{' '}
              <a href="/terms-of-service" className="text-[#4A6FA5] hover:underline" target="_blank">Terms of Service</a>{' '}
              and{' '}
              <a href="/privacy-policy" className="text-[#4A6FA5] hover:underline" target="_blank">Privacy Policy</a>{' '}
              and provide my express written consent to be contacted by Clifford Press LLC DBA Claim Anchor
              and its network of participating attorneys regarding my potential legal claim via email,
              telephone, and/or SMS/text message at the phone number and email I provided above,
              including through the use of automated dialing technology, pre-recorded messages,
              and/or artificial intelligence. I understand that my consent is not required as a condition
              of purchasing any goods or services, and that I may revoke my consent at any time.
              Message and data rates may apply. Reply STOP to opt out of text messages.
            </p>
          </label>
          {errors.tcpaConsent && <p className="mt-1 text-xs text-red-500">{errors.tcpaConsent.message}</p>}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-4 rounded-xl bg-[#C9922A] text-white font-semibold text-base hover:bg-[#b8821f] disabled:opacity-60 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z"/>
              </svg>
              Submitting...
            </>
          ) : (
            "Submit My Case — It's Free →"
          )}
        </button>

        <p className="text-center text-[11px] text-[#9CA3AF]">
          🔒 Your information is secure and never sold to third parties.
        </p>
      </form>
    </motion.div>
  )
}
