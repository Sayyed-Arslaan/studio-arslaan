import React, { ReactNode } from 'react';

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = '',
  hover = true
}) => {
  const baseClasses = `
    backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl
    shadow-2xl shadow-cyan-500/10
  `;
  
  const hoverClasses = hover ? `
    hover:bg-white/10 hover:border-white/20 hover:shadow-cyan-500/20
    hover:scale-105 transition-all duration-300 ease-out
  ` : '';

  return (
    <div className={`${baseClasses} ${hoverClasses} ${className}`}>
      {children}
    </div>
  );
};