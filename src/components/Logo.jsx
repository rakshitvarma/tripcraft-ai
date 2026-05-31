/**
 * TripCraft plane SVG logo — gradient from indigo → violet → rose.
 * @param {{ size?: number, className?: string }} props
 */
export default function Logo({ size = 28, className = '' }) {
  const id = 'tcgrad'
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className={className}
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#6366f1" />
          <stop offset="50%"  stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#f43f5e" />
        </linearGradient>
      </defs>
      <path
        d="M28 12.5L20 16l-6-8-2 1 3 8.5L9 19l-2-2.5-1.5.5 1.5 4.5L8.5 26l1.5-.5-.5-3 2.5-1.5 5.5 7 2-1-1-9L26 14l2-1.5z"
        fill={`url(#${id})`}
      />
    </svg>
  )
}
