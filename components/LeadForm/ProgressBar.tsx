'use client'

interface ProgressBarProps {
  step: number
  total: number
}

export function ProgressBar({ step, total }: ProgressBarProps) {
  const pct = Math.round((step / total) * 100)

  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-medium text-[#6B7280]">Step {step} of {total}</span>
        <span className="text-xs font-medium text-[#4A6FA5]">{pct}%</span>
      </div>
      <div className="h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#1B3A6B] rounded-full transition-all duration-500 ease-out"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
