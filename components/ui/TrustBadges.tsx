const badges = [
  { icon: '🛡️', label: 'TCPA Compliant' },
  { icon: '🔒', label: '256-bit Secure' },
  { icon: '⭐', label: '4.8/5 Rating' },
  { icon: '✓', label: 'No Win, No Fee' },
  { icon: '⚡', label: 'Response in Minutes' },
]

export function TrustBadges() {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
      {badges.map((b) => (
        <div
          key={b.label}
          className="flex items-center gap-1.5 bg-white border border-[#E5E7EB] rounded-full px-3 py-1.5 shadow-sm"
        >
          <span className="text-sm">{b.icon}</span>
          <span className="text-xs font-medium text-[#374151]">{b.label}</span>
        </div>
      ))}
    </div>
  )
}
