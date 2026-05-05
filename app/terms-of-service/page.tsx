import { Logo } from '@/components/ui/Logo'
import { Footer } from '@/components/Footer'

export default function TermsOfService() {
  const effective = 'May 5, 2026'

  return (
    <>
      <header className="bg-white border-b border-[#E5E7EB] px-5 sm:px-8 py-4">
        <a href="/"><Logo /></a>
      </header>

      <main className="max-w-3xl mx-auto px-5 sm:px-8 py-12">
        <h1 className="text-3xl font-bold text-[#1A1A2E] mb-2">Terms of Service</h1>
        <p className="text-sm text-[#6B7280] mb-10">
          <strong>Owner:</strong> Clifford Press LLC DBA Claim Anchor &nbsp;|&nbsp;
          <strong>Effective Date:</strong> {effective}
        </p>

        <div className="space-y-8 text-[#374151] text-sm leading-relaxed">
          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the Claim Anchor website and services ("Service"), you agree to be bound by these Terms of Service.
              If you do not agree to these terms, do not use the Service.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">2. Description of Service</h2>
            <p>
              Claim Anchor is a free referral and connection service operated by Clifford Press LLC DBA Claim Anchor.
              We connect individuals who may have personal injury claims with licensed attorneys in our network.
              We are not a law firm and do not directly represent any party in legal matters.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">3. No Attorney-Client Relationship</h2>
            <p>
              Use of this Service does not create an attorney-client relationship between you and Clifford Press LLC,
              Claim Anchor, or any attorney in our network. An attorney-client relationship is only established when
              you enter into a separate written agreement with a licensed attorney.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">4. No Legal Advice</h2>
            <p>
              Nothing on this website constitutes legal advice. All information provided is for general informational
              purposes only. You should not rely on any information on this site as a substitute for professional legal advice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">5. Eligibility</h2>
            <p>
              The Service is available only to individuals who are 18 years of age or older and are residents of the
              United States. By using the Service, you represent that you meet these eligibility requirements.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">6. User Representations</h2>
            <p>
              By submitting information through the Service, you represent and warrant that:
            </p>
            <ul className="list-disc pl-5 space-y-1 mt-2">
              <li>All information you provide is accurate, complete, and current.</li>
              <li>You have the legal right to provide such information.</li>
              <li>Your use of the Service will comply with all applicable laws and regulations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">7. TCPA Consent</h2>
            <p>
              By submitting your contact information and checking the consent box, you expressly consent to be contacted
              by Clifford Press LLC DBA Claim Anchor and its network of participating attorneys via email, telephone,
              and/or SMS/text message — including through automated dialing technology, pre-recorded messages, and/or
              artificial intelligence — regarding your potential legal claim. Consent is not required as a condition of
              any purchase. Message and data rates may apply. Reply STOP to opt out.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">8. Disclaimer of Warranties</h2>
            <p>
              THE SERVICE IS PROVIDED "AS IS" WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
              WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES.
              WE DO NOT GUARANTEE ANY PARTICULAR LEGAL OUTCOME OR RESULT.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">9. Limitation of Liability</h2>
            <p>
              TO THE FULLEST EXTENT PERMITTED BY LAW, CLIFFORD PRESS LLC SHALL NOT BE LIABLE FOR ANY INDIRECT,
              INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES ARISING FROM YOUR USE OF THE SERVICE.
              OUR TOTAL LIABILITY TO YOU SHALL NOT EXCEED ONE HUNDRED DOLLARS ($100).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">10. Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of California,
              without regard to its conflict of law provisions.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. Changes will be effective upon posting to the website.
              Your continued use of the Service after changes are posted constitutes acceptance of the revised Terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#1A1A2E] mb-3">12. Contact Information</h2>
            <div className="p-4 bg-[#F8F9FC] rounded-xl">
              <p><strong>Clifford Press LLC DBA Claim Anchor</strong></p>
              <p>Email: <a href="mailto:legal@claimanchor.com" className="text-[#4A6FA5] hover:underline">legal@claimanchor.com</a></p>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  )
}
