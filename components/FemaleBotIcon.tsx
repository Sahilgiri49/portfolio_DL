import React from 'react';

interface FemaleBotIconProps {
  state: 'idle' | 'listening' | 'speaking';
  size?: number;
  className?: string;
}

export const FemaleBotIcon: React.FC<FemaleBotIconProps> = ({ state, size = 32, className }) => {
  const speakingPath = <path d="M8 12.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5z" />;
  const idlePath = <path d="M9 12.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5z" />;
  const listeningPath = <circle cx="12" cy="12.5" r="1.5" />;
  
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <rect x="5" y="2" width="14" height="14" rx="4" />
      <path d="M12 16v4" />
      <path d="M8 20h8" />
      {/* Lashes */}
      <path d="M8 6l-1-1"/>
      <path d="M16 6l1-1"/>
      {/* Mouth based on state */}
      {state === 'speaking' && speakingPath}
      {state === 'idle' && idlePath}
      {state === 'listening' && listeningPath}
      {/* Antenna with light */}
      <path d="M12 2v-1" />
      {state === 'listening' && <circle cx="12" cy="0.5" r="1" fill="currentColor" className="animate-pulse" />}
    </svg>
  );
};
