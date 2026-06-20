import React from 'react';

const XTwitterIcon = ({
  size = undefined,
  color = '#000000',
  strokeWidth = 2,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 48 + (padding * 2);
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
      <a href="https://x.com/callme_Canice" target="_blank" rel="noopener noreferrer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox={viewBox}
          width={20}
          height={20}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity,
            transform: transforms.join(' ') || undefined,
            filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
            backgroundColor: background !== 'transparent' ? background : undefined
          }}
        >
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M21.604 25.622L7.693 41.498M37.924 6.502L25.554 21.07M6.61 6.5l27.44 35h7.56l-27.439-35z"/>
        </svg>
      </a>    
  );
};

export default XTwitterIcon;