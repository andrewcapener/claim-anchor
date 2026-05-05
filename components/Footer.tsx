import { Logo } from '@/components/ui/Logo'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-[#1B3A6B] text-white">
      <div className="max-w-6xl mx-auto px-5 sm:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <Logo white small />
          <nav className="flex flex-wrap gap-4 text-sm">
            <a href="/privacy-policy" className="text-white/70 hover:text-white transition-colors">Privacy Policy</a>
            <a href="/terms-of-service" className="text-white/70 hover:text-white transition-colors">Terms of Service</a>
            <a href="/privacy-policy#do-not-sell" className="text-white/70 hover:text-white transition-colors">Do Not Sell My Info</a>
          </nav>
        </div>
        <p className="text-white/50 text-xs leading-relaxed text-center">
          © {year} Clifford Press LLC DBA Claim Anchor. All rights reserved.
        </p>
        <p className="mt-3 text-[11px] text-white/40 leading-relaxed text-center max-w-4xl mx-auto">
          Claim Anchor is owned and operated by Clifford Press LLC DBA Claim Anchor.
          Claim Anchor is not a law firm and does not provide legal advice. Submitting your information does not create an
          attorney-client relationship. The information provided on this website is for general informational purposes only.
          Results may vary. Not available in all states. By using this website, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </footer>
  )
}
