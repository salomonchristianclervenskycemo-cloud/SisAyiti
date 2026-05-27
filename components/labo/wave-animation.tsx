interface WaveAnimationProps {
  active: boolean
  ariaLabel?: string
}

export function WaveAnimation({ active, ariaLabel = "Wave propagation" }: WaveAnimationProps) {
  return (
    <svg viewBox="0 0 200 200" className="w-32 h-32 md:w-40 md:h-40 motion-reduce:hidden" aria-label={ariaLabel}>
      <circle cx="100" cy="100" r="5" fill="#2E8BC0"/>
      {active && [1,2,3,4].map(i => (
        <circle key={i} cx="100" cy="100" r="5" stroke="#2E8BC0" strokeWidth="1.5" fill="none" opacity="0.7">
          <animate attributeName="r" values={`5;${20*i}`} dur={`${i*0.7}s`} begin={`${(i-1)*0.35}s`} repeatCount="indefinite"/>
          <animate attributeName="opacity" values="0.7;0" dur={`${i*0.7}s`} begin={`${(i-1)*0.35}s`} repeatCount="indefinite"/>
        </circle>
      ))}
    </svg>
  )
}
