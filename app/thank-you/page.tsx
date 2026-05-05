import { Footer } from '@/components/Footer'
import { Logo } from '@/components/ui/Logo'

const PHONE = process.env.NEXT_PUBLIC_PHONE ?? '1-800-CLAIM-NOW'

export default function ThankYou() {
  return (
    <>
      <div className="min-h-screen bg-[#F8F9FC] flex flex-col">
        <header className="bg-white border-b border-[#E5E7EB] px-5 sm:px-8 py-4">
          <Logo />
        </header>

        <main className="flex-1 flex items-center justify-center px-4 py-16">
          <div className="bg-white rounded-2xl shadow-md border border-[#E5E7EB] max-w-lg w-full p-8 text-center">
            <div className="mx-auto mb-6 w-16 h-16 rounded-full bg-[#059669]/10 flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#059669]" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-2xl font-bold text-[#1A1A2E] mb-3">
              Your Case Has Been Submitted
            </h1>
            <p className="text-[#6B7280] mb-6 leading-relaxed">
              A legal specialist will contact you within the next few minutes.
              Keep your phone nearby.
            </p>

            <div className="bg-[#F8F9FC] rounded-xl p-4 mb-6 text-left">
              <p className="text-sm font-semibold text-[#374151] mb-2">What happens next:</p>
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
              href={`tel:${PHONE.replace(/[^0-9+]/g, '')}`}
              className="block w-full py-4 rounded-xl bg-[#1B3A6B] text-white font-bold text-lg hover:bg-[#163060] transition-colors mb-3"
            >
              📞 Call Now: {PHONE}
            </a>
            <p className="text-xs text-[#9CA3AF]">Don't want to wait? Call us directly and skip the queue.</p>
          </div>
        </main>
      </div>
      <Footer />
    </>
  )
}
