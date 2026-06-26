"use client"

import React from 'react'

// function BrandIcon({ size = 28 }: { size?: number }) {
//   return (
//     <svg width={size} height={size} viewBox="0 0 44 44" fill="none">
//       <rect width="44" height="44" rx="11" fill="#f59e0b"/>
//       <rect x="11" y="9" width="14" height="18" rx="2.5" fill="white" opacity="0.22"/>
//       <rect x="12.5" y="10.5" width="14" height="18" rx="2.5" fill="white" opacity="0.3"/>
//       <rect x="14" y="12" width="14" height="18" rx="2" fill="white"/>
//       <rect x="17" y="17" width="8" height="1.5" rx="0.75" fill="#f59e0b"/>
//       <rect x="17" y="20" width="8" height="1.5" rx="0.75" fill="#f59e0b"/>
//       <rect x="17" y="23" width="5" height="1.5" rx="0.75" fill="#f59e0b"/>
//       <circle cx="27" cy="32" r="5" fill="#1a1000"/>
//       <path d="M25 32.5 L27 30.5 L29 32.5" stroke="#f59e0b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
//       <rect x="25" y="32.5" width="4" height="2" rx="0.5" fill="#f59e0b"/>
//     </svg>
//   )
// }

// export default BrandIcon

type StudyFlowLogoProps = {
  /** Overall size in px (width = height for the icon-only mark). Default 32. */
  size?: number;
  /** Show the "studyflow" wordmark next to the icon. Default true. */
  withWordmark?: boolean;
  /** Color of the flow path + dots. Defaults to the brand gradient. */
  color?: string;
  /** Color of the wordmark text. Default "currentColor". */
  textColor?: string;
  /** Extra classes, e.g. for hover states or sizing via Tailwind. */
  className?: string;
};

/**
 * StudyFlow logo. Renders the S-flow mark, optionally with the wordmark.
 *
 * Usage:
 *   <StudyFlowLogo />                              // icon + wordmark, brand colors
 *   <StudyFlowLogo withWordmark={false} size={24} />  // icon only, e.g. favicon-style nav mark
 *   <StudyFlowLogo color="#fff" textColor="#fff" />   // monochrome, for dark hero sections
 */
export default function BrandIcon({
  size = 32,
  withWordmark = true,
  color,
  textColor = "currentColor",
  className,
}: StudyFlowLogoProps) {
  const gradientId = "studyflow-flow-gradient";

  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: size * 0.35,
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 80 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="StudyFlow logo"
      >
        {!color && (
          <defs>
            <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#185FA5" />
              <stop offset="100%" stopColor="#378ADD" />
            </linearGradient>
          </defs>
        )}
        <path
          d="M2 34 C2 14 22 -26 40 -26 C66 -26 66 -2 48 6 C30 14 30 34 54 34 C72 34 78 20 78 8"
          transform="translate(0, 26)"
          fill="none"
          stroke={color ?? `url(#${gradientId})`}
          strokeWidth="9"
          strokeLinecap="round"
        />
        <circle cx="2" cy="60" r="6" fill={color ?? "#85B7EB"} />
        <circle cx="78" cy="34" r="6" fill={color ?? "#85B7EB"} />
      </svg>
    </span>
  );
}