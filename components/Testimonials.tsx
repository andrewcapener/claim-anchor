const testimonials = [
  {
    initials: 'MT',
    name: 'Maria T.',
    location: 'Los Angeles, CA',
    type: 'Car Accident',
    amount: '$67,000',
    color: '#1B3A6B',
    quote: "I didn't think I had a case — the other driver's insurance kept saying I was partially at fault. Claim Anchor connected me with an attorney who proved otherwise.",
    stars: 5,
  },
  {
    initials: 'JR',
    name: 'James R.',
    location: 'Houston, TX',
    type: 'Truck Accident',
    amount: '$142,000',
    color: '#4A6FA5',
    quote: "Filled out the form on my phone from the hospital. A lawyer called me within the hour. I had no idea my case was worth anywhere near what I recovered.",
    stars: 5,
  },
  {
    initials: 'SK',
    name: 'Sandra K.',
    location: 'Orlando, FL',
    type: 'Slip & Fall',
    amount: '$38,500',
    color: '#C9922A',
    quote: "I was told by the store manager that they weren't liable. My attorney showed them otherwise. The process was stress-free — I just answered a few questions online.",
    stars: 5,
  },
  {
    initials: 'MD',
    name: 'Michael D.',
    location: 'Atlanta, GA',
    type: 'Car Accident',
    amount: '$89,000',
    color: '#059669',
    quote: "I was worried about legal fees. Not a single dollar out of pocket — ever. My attorney only got paid when I did. This service changed my family's life.",
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#C9922A" className="w-4 h-4">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
        </svg>
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="py-14 sm:py-20 bg-[#F8F9FC]">
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-10">
          <p className="text-sm font-semibold text-[#C9922A] uppercase tracking-wide mb-2">Real Results</p>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1A1A2E]">
            Accident Victims We've Helped
          </h2>
          <p className="text-[#6B7280] mt-2 max-w-xl mx-auto">
            These are real outcomes from real people who used Claim Anchor to connect with an attorney.
            Individual results vary based on case specifics.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 shadow-sm border border-[#E5E7EB] flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
                  style={{ backgroundColor: t.color }}
                >
                  {t.initials}
                </div>
                <div>
                  <p className="font-semibold text-[#1A1A2E] text-sm leading-tight">{t.name}</p>
                  <p className="text-xs text-[#6B7280]">{t.location}</p>
                </div>
              </div>

              {/* Stars */}
              <Stars count={t.stars} />

              {/* Quote */}
              <p className="text-sm text-[#374151] leading-relaxed mt-3 flex-1">
                "{t.quote}"
              </p>

              {/* Result */}
              <div className="mt-4 pt-4 border-t border-[#E5E7EB]">
                <p className="text-xs text-[#6B7280] mb-0.5">{t.type} — Recovered</p>
                <p className="text-xl font-bold text-[#059669]">{t.amount}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10">
          <a
            href="#lead-form"
            className="inline-block px-8 py-3.5 bg-[#C9922A] text-white font-semibold rounded-xl hover:bg-[#b8821f] transition-colors shadow-sm"
          >
            Check If I Qualify — It's Free →
          </a>
          <p className="text-xs text-[#9CA3AF] mt-2">
            Individual results vary. Past outcomes do not guarantee future results.
          </p>
        </div>
      </div>
    </section>
  )
}
