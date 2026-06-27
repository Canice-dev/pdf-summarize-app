type StudyFlowLogoProps = {
  /** Size of the icon square in px. Default 32. */
  size?: number;
  /** Show the "StudyFlow" wordmark next to the icon. Default true. */
  withWordmark?: boolean;
  /** Background color of the rounded-square mark. Default brand navy. */
  bgColor?: string;
  /** Color of the book strokes inside the mark. Default white. */
  markColor?: string;
  /** Color of the wordmark text. Default "currentColor". */
  textColor?: string;
  /** Extra classes, e.g. for hover states or sizing via Tailwind. */
  className?: string;
};

/**
 * StudyFlow logo — rounded-square mark with an open-book glyph.
 *
 * Usage:
 *   <StudyFlowLogo />                                 // icon + wordmark, brand navy
 *   <StudyFlowLogo withWordmark={false} size={28} />     // icon only, e.g. compact nav
 *   <StudyFlowLogo bgColor="#fff" markColor="#1B3A6B" /> // light/outline variant
 *   <StudyFlowLogo size={120} withWordmark={false} />    // app icon preview
 */
export default function BrandIcon({
  size = 32,
  withWordmark = true,
  bgColor = "#1B3A6B",
  markColor = "#FFFFFF",
  textColor = "currentColor",
  className,
}: StudyFlowLogoProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 92 92"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="StudyFlow logo"
      >
        <rect width="92" height="92" rx="20" fill={bgColor} />
        <path
          d="M24 32 L46 44 L68 32 L68 66 L46 78 L24 66 Z"
          fill="none"
          stroke={markColor}
          strokeWidth="3.6"
          strokeLinejoin="round"
        />
        <line x1="46" y1="44" x2="46" y2="78" stroke={markColor} strokeWidth="3.6" />
      </svg>

      {withWordmark && (
        <span
          style={{
            fontSize: size * 0.6,
            fontWeight: 600,
            color: textColor,
            letterSpacing: "-0.01em",
            lineHeight: 1,
          }}
        >
          StudyFlow
        </span>
      )}
    </span>
  );
}