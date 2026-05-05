interface LogoProps {
  white?: boolean
  small?: boolean
}

export function Logo({ white, small }: LogoProps) {
  const iconSize = small ? 24 : 30
  const textSize = small ? 'text-base' : 'text-xl'
  const color = white ? '#ffffff' : '#1B3A6B'

  return (
    <div className="flex items-center gap-2">
      <img
        src="/claim-anchor-icon.svg"
        alt=""
        width={iconSize}
        height={iconSize}
        style={white ? { filter: 'brightness(0) invert(1)' } : undefined}
      />
      <span
        className={`${textSize} font-bold tracking-tight`}
        style={{ color }}
      >
        Claim Anchor
      </span>
    </div>
  )
}
