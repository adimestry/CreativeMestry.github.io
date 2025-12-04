import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="relative">
        {/* Outer Ring */}
        <div className={`${sizeClasses[size]} rounded-full border-2 border-transparent bg-gradient-to-r from-neon-blue via-neon-purple to-neon-pink animate-spin`}>
          <div className="absolute inset-1 rounded-full bg-background" />
        </div>
        
        {/* Inner Glow */}
        <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-gradient-to-r from-neon-blue/20 via-neon-purple/20 to-neon-pink/20 animate-pulse`} />
      </div>
    </div>
  );
};

export default LoadingSpinner;