'use client'

import { useEffect, useState } from 'react'

const ACTIVITIES = [
  'Someone in California just checked their eligibility',
  'Someone in Texas just submitted a case review',
  'Someone in Florida just connected with an attorney',
  'Someone in New York just checked their eligibility',
  'Someone in Georgia just submitted a case review',
  'Someone in Ohio just connected with an attorney',
  'Someone in Arizona just checked their eligibility',
  'Someone in Illinois just submitted a case review',
]

function getRandomBetween(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function SocialProofTicker() {
  const [checkedToday] = useState(() => getRandomBetween(34, 67))
  const [activity, setActivity] = useState(ACTIVITIES[0])
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const cycle = () => {
      setVisible(false)
      setTimeout(() => {
        setActivity(ACTIVITIES[Math.floor(Math.random() * ACTIVITIES.length)])
        setVisible(true)
      }, 400)
    }
    const id = setInterval(cycle, 5000)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 py-3 px-4 bg-white border-b border-[#E5E7EB] text-sm">
      {/* Live count */}
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#059669] animate-pulse flex-shrink-0"></span>
        <span className="text-[#374151]">
          <strong className="text-[#1B3A6B]">{checkedToday} people</strong> checked eligibility today
        </span>
      </div>

      {/* Divider */}
      <span className="hidden sm:block text-[#E5E7EB]">|</span>

      {/* Activity ticker */}
      <div
        className="flex items-center gap-1.5 transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span className="text-[#C9922A]">🔔</span>
        <span className="text-[#6B7280]">{activity}</span>
      </div>
    </div>
  )
}
