import { Logo } from '@/components/ui/Logo'
import { Footer } from '@/components/Footer'

export default function PrivacyPolicy() {
  const effective = 'May 5, 2026'

  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] px-5 sm:px-8 py-4">
        <a href="/"><Logo /></a>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Privacy Policy</h1>
        <p className="text-sm text-[#6B7280] mb-10">
          <strong>Owner:</strong> Clifford Press LLC DBA Claim Anchor &nbsp;|&nbsp;
          <strong>Effective Date:</strong> {effective}
        </p>

        <div className="prose prose-sm max-w-none text-[#374151] space-y-8">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Information We Collect</h2>
            <p>When you use Claim Anchor, we collect the following categories of information:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Personal identifiers:</strong> First name, last name, email address, phone number, and state of residence.</li>
              <li><strong>Accident details:</strong> Type of accident, approximate date, whether you received medical treatment, fault assessment, and attorney status.</li>
              <li><strong>Device and usage data:</strong> IP address, browser type, operating system, referring URL, and pages visited.</li>
              <li><strong>Communication data:</strong> Messages sent through our AI chat assistant.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To evaluate whether you may qualify for legal representation and connect you with participating attorneys.</li>
              <li>To contact you regarding your potential legal claim via email, telephone, and/or SMS/text message, including through automated dialing technology, pre-recorded messages, and/or artificial intelligence, as described in our TCPA consent language.</li>
              <li>To improve our services, analyze usage patterns, and maintain site security.</li>
              <li>To comply with applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. Information Sharing</h2>
            <p>Your information may be shared with:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li><strong>Participating attorneys and law firms</strong> in our network for the purpose of evaluating and potentially representing your claim.</li>
              <li><strong>Service providers</strong> who assist us in operating our website and delivering our services, subject to confidentiality obligations.</li>
              <li><strong>Legal authorities</strong> when required by law, court order, or regulatory requirement.</li>
            </ul>
            <p className="mt-2"><strong>We do not sell your personal information to marketers or unrelated third parties.</strong></p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. TCPA Consent & Communications</h2>
            <p>
              By submitting your information, you provide express written consent to be contacted by Clifford Press LLC DBA Claim Anchor
              and its network of participating attorneys via email, telephone, and/or SMS/text message, including through automated
              dialing systems, pre-recorded messages, and/or artificial intelligence.
            </p>
            <p className="mt-2">
              <strong>To opt out of text messages:</strong> Reply STOP to any text message you receive from us. Standard message and data rates may apply.
              You may also opt out of email communications by clicking the unsubscribe link in any email.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Data Security</h2>
            <p>
              We use industry-standard SSL/TLS encryption to protect data transmitted to and from our website.
              We implement reasonable technical and organizational measures to protect your information from unauthorized access,
              disclosure, alteration, or destruction.
            </p>
          </section>

          <section id="do-not-sell">
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. Your Rights</h2>
            <p>Depending on your state of residence, you may have the right to:</p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>Access the personal information we hold about you.</li>
              <li>Request correction or deletion of your personal information.</li>
              <li>Opt out of the sale or sharing of your personal information.</li>
              <li>Withdraw consent at any time (noting this does not affect prior processing).</li>
            </ul>
            <p className="mt-2">
              To exercise these rights, contact us at:{' '}
              <a href="mailto:privacy@claimanchor.com" className="text-[#4A6FA5] hover:underline">
                privacy@claimanchor.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. Cookies & Analytics</h2>
            <p>
              We use Vercel Analytics and standard cookies to understand how visitors interact with our site.
              These tools collect anonymized usage data including page views and navigation patterns.
              We do not use cookies for targeted advertising.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="mt-2 p-4 bg-[#F8F9FC] rounded-xl text-sm">
              <p><strong>Clifford Press LLC DBA Claim Anchor</strong></p>
              <p>Email: <a href="mailto:privacy@claimanchor.com" className="text-[#4A6FA5] hover:underline">privacy@claimanchor.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
