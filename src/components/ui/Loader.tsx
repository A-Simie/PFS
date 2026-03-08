import type { FC } from 'react';

interface LoaderProps {
  size?: number;
  showText?: boolean;
}

const Loader: FC<LoaderProps> = ({ size = 120, showText = false }) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-bg-dark overflow-hidden">
      <div 
        className="relative flex items-center justify-center transition-all duration-500"
        style={{ width: size, height: size }}
      >
        {/* Background glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.15)_0%,transparent_70%)] loader-pulse-glow" 
          style={{ width: size * 0.7, height: size * 0.7 }}
        />
        
        {/* Rotating ring */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border border-accent-gold/10 rounded-full loader-rotate" 
          style={{ width: size * 0.9, height: size * 0.9 }}
        />

        <svg 
          className="w-full h-full relative z-10" 
          viewBox="0 0 200 200" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="liquid-gold" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" style={{ stopColor: '#8b7355' }} />
              <stop offset="30%" style={{ stopColor: '#c9a962' }} />
              <stop offset="60%" style={{ stopColor: '#f0e6c8' }} />
              <stop offset="100%" style={{ stopColor: '#c9a962' }} />
            </linearGradient>

            <clipPath id="clip-p-small">
              <path d="M 40 140 L 40 60 L 70 60 C 85 60 95 70 95 85 C 95 100 85 110 70 110 L 55 110 L 55 140 Z M 55 95 L 70 95 C 76 95 80 91 80 85 C 80 79 76 75 70 75 L 55 75 Z" />
            </clipPath>

            <clipPath id="clip-s-small">
              <path d="M 130 140 L 130 125 L 160 125 C 166 125 170 121 170 115 C 170 109 166 105 160 105 L 145 105 C 125 105 115 95 115 80 C 115 65 125 55 145 55 L 170 55 L 170 70 L 145 70 C 135 70 130 74 130 80 C 130 86 135 90 145 90 L 160 90 C 180 90 190 100 190 115 C 190 130 180 140 160 140 Z" />
            </clipPath>
          </defs>

          {/* Letter P Group */}
          <g className="loader-slide-left">
            <path className="fill-none stroke-accent-gold/40 stroke-2" d="M 40 140 L 40 60 L 70 60 C 85 60 95 70 95 85 C 95 100 85 110 70 110 L 55 110 L 55 140 Z M 55 95 L 70 95 C 76 95 80 91 80 85 C 80 79 76 75 70 75 L 55 75 Z" />
            <g clipPath="url(#clip-p-small)">
              <rect className="loader-fill-p fill-[url(#liquid-gold)]" x="35" y="55" width="65" height="90" />
              <path className="fill-[url(#liquid-gold)] opacity-90 loader-wave" d="M 35 60 Q 50 55, 67 60 T 100 60 L 100 65 L 35 65 Z" />
            </g>
          </g>

          {/* Letter S Group */}
          <g className="loader-slide-right">
            <path className="fill-none stroke-accent-gold/40 stroke-2" d="M 130 140 L 130 125 L 160 125 C 166 125 170 121 170 115 C 170 109 166 105 160 105 L 145 105 C 125 105 115 95 115 80 C 115 65 125 55 145 55 L 170 55 L 170 70 L 145 70 C 135 70 130 74 130 80 C 130 86 135 90 145 90 L 160 90 C 180 90 190 100 190 115 C 190 130 180 140 160 140 Z" />
            <g clipPath="url(#clip-s-small)">
              <rect className="loader-fill-s fill-[url(#liquid-gold)]" x="110" y="50" width="85" height="95" />
              <path className="fill-[url(#liquid-gold)] opacity-90 loader-wave" d="M 110 55 Q 135 50, 160 55 T 195 55 L 195 60 L 110 60 Z" />
            </g>
          </g>
        </svg>

        {showText && (
          <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-accent-gold font-bold text-[10px] tracking-[2px] uppercase opacity-0 loader-fade-up">
            Loading
          </div>
        )}
        
        <div className="absolute bottom-[-20px] left-1/2 -translate-x-1/2 w-[60px] h-[1.5px] bg-accent-gold/20 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-accent-gold via-[#f0e6c8] to-accent-gold w-0 loader-progress" />
        </div>
      </div>
    </div>
  );
};
export default Loader;
