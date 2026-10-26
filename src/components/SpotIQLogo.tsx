import React from 'react';

interface SpotIQLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showWordmark?: boolean;
  subtitle?: string;
  className?: string;
}

export const SpotIQLogo: React.FC<SpotIQLogoProps> = ({
  size = 'md',
  showWordmark = true,
  subtitle,
  className = '',
}) => {
  const iconDimensions = {
    sm: 'w-7 h-7',
    md: 'w-10 h-10',
    lg: 'w-14 h-14',
  }[size];

  const textSize = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* High-contrast Neon Green Location Pin Logo */}
      <div className={`relative shrink-0 ${iconDimensions} flex items-center justify-center`}>
        {/* Subtle Ambient Pulse Ring */}
        <div className="absolute inset-0 rounded-2xl bg-[#7CFF65]/20 animate-ping opacity-75 pointer-events-none" />

        {/* Pin Container */}
        <div className="relative w-full h-full rounded-2xl bg-[#0b0e13] border border-[#7CFF65]/40 shadow-[0_0_20px_rgba(124,255,101,0.35)] flex items-center justify-center overflow-hidden">
          {/* Internal diagonal accent */}
          <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-[#7CFF65]/10 blur-sm pointer-events-none" />

          {/* SVG Pin + Smart Dot */}
          <svg
            viewBox="0 0 24 24"
            className="w-3/5 h-3/5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Outer Pin Body */}
            <path
              d="M12 2C8.13401 2 5 5.13401 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13401 15.866 2 12 2Z"
              fill="#7CFF65"
            />
            {/* Inner Cutout Hole */}
            <circle cx="12" cy="9" r="3.2" fill="#080B10" />
            {/* Smart Telemetry Core Spark */}
            <circle cx="12" cy="9" r="1.5" fill="#7CFF65" />
          </svg>
        </div>
      </div>

      {/* Wordmark and Optional Subtitle */}
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <div className={`font-extrabold tracking-tight ${textSize} font-headline flex items-center`}>
            <span className="text-white">Spot</span>
            <span className="text-[#7CFF65] drop-shadow-[0_0_12px_rgba(124,255,101,0.5)]">IQ</span>
          </div>
          {subtitle && (
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#849396] mt-0.5">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
