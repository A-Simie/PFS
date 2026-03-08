import type { FC } from 'react';

interface LogoProps {
  size?: number;
  className?: string;
}

export const Logo: FC<LogoProps> = ({ size = 32, className = "" }) => {
  return (
    <div 
      className={`relative flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <svg 
        className="w-full h-full relative z-10" 
        viewBox="0 0 200 200" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logo-gold" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" style={{ stopColor: '#c9a962' }} />
            <stop offset="100%" style={{ stopColor: '#f0e6c8' }} />
          </linearGradient>

          <clipPath id="logo-p">
            <path d="M 40 140 L 40 60 L 70 60 C 85 60 95 70 95 85 C 95 100 85 110 70 110 L 55 110 L 55 140 Z M 55 95 L 70 95 C 76 95 80 91 80 85 C 80 79 76 75 70 75 L 55 75 Z" />
          </clipPath>

          <clipPath id="logo-s">
            <path d="M 130 140 L 130 125 L 160 125 C 166 125 170 121 170 115 C 170 109 166 105 160 105 L 145 105 C 125 105 115 95 115 80 C 115 65 125 55 145 55 L 170 55 L 170 70 L 145 70 C 135 70 130 74 130 80 C 130 86 135 90 145 90 L 160 90 C 180 90 190 100 190 115 C 190 130 180 140 160 140 Z" />
          </clipPath>
        </defs>

        {/* Letter P */}
        <path className="fill-[url(#logo-gold)]" d="M 40 140 L 40 60 L 70 60 C 85 60 95 70 95 85 C 95 100 85 110 70 110 L 55 110 L 55 140 Z M 55 95 L 70 95 C 76 95 80 91 80 85 C 80 79 76 75 70 75 L 55 75 Z" />

        {/* Letter S */}
        <path className="fill-primary" d="M 130 140 L 130 125 L 160 125 C 166 125 170 121 170 115 C 170 109 166 105 160 105 L 145 105 C 125 105 115 95 115 80 C 115 65 125 55 145 55 L 170 55 L 170 70 L 145 70 C 135 70 130 74 130 80 C 130 86 135 90 145 90 L 160 90 C 180 90 190 100 190 115 C 190 130 180 140 160 140 Z" />
      </svg>
    </div>
  );
};

