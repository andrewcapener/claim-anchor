'use client'

import { useState } from 'react'

const FAQS = [
  {
    q: 'Is this service really free?',
    a: 'Yes. Claim Anchor is completely free to use. We connect accident victims with experienced personal injury attorneys at no cost. If your attorney takes your case, they work on a contingency basis — meaning they only get paid if you win. You pay nothing upfront, ever.',
  },
  {
    q: 'What types of accidents qualify?',
    a: "Most accidents involving another party's negligence qualify, including car accidents, truck accidents, motorcycle accidents, slip and fall injuries, pedestrian accidents, and more. If you're unsure whether your situation qualifies, submit your information for a free review.",
  },
  {
    q: 'How quickly will someone contact me?',
    a: 'In most cases, a legal specialist will contact you within minutes of submitting your information during business hours. After-hours submissions are followed up first thing the next morning.',
  },
  {
    q: 'Do I need to have already seen a doctor?',
    a: "Not necessarily. While medical documentation strengthens your case, an attorney can advise you on the best steps to take. We encourage you to submit your information even if you haven't seen a doctor yet.",
  },
  {
    q: 'Will my information be shared or sold?',
    a: 'Your information is shared only with participating attorneys in our network who are qualified to evaluate your case. We do not sell your data to marketers or unrelated third parties.',
  },
  {
    q: "What if I'm partially at fault?",
    a: 'Many states follow comparative negligence rules, which means you may still recover compensation even if you were partially at fault. An attorney can review the specific laws in your state and advise you accordingly.',
  },
]

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section className="py-14 sm:py-20 bg-white">
      <div className="max-w-2xl mx-auto px-5 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E] text-center mb-10">
          Frequently Asked Questions
        </h2>

        {/* Schema.org FAQ markup */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: FAQS.map((faq) => ({
                '@type': 'Question',
                name: faq.q,
                acceptedAnswer: { '@type': 'Answer', text: faq.a },
              })),
            }),
          }}
        />

        <div className="divide-y divide-[#E5E7EB]">
          {FAQS.map((faq, i) => (
            <div key={i}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-4 flex items-start justify-between gap-4"
                aria-expanded={open === i}
              >
                <span className="font-semibold text-[#1A1A2E] text-sm sm:text-base pr-2">
                  {faq.q}
                </span>
                <span
                  className={`flex-shrink-0 w-5 h-5 text-[#6B7280] transition-transform duration-200 ${
                    open === i ? 'rotate-45' : ''
                  }`}
                >
                  <svg viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                  </svg>
                </span>
              </button>
              {open === i && (
                <p className="text-sm text-[#6B7280] leading-relaxed pb-4">
                  {faq.a}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
