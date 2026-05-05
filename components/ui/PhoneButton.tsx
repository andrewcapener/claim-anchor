interface PhoneButtonProps {
  phone: string
  className?: string
}

export function PhoneButton({ phone, className = '' }: PhoneButtonProps) {
  return (
    <a
      href={`tel:${phone.replace(/[^0-9+]/g, '')}`}
      className={`font-semibold text-[#1B3A6B] hover:text-[#4A6FA5] transition-colors ${className}`}
    >
      {phone}
    </a>
  )
}
