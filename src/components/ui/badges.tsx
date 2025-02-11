import React, { ReactNode } from 'react';


type BadgeVariant = 'default' | 'outline' | 'secondary';

interface BadgesProps {
  children: ReactNode; 
  className?: string; 
  variant?: BadgeVariant; 
} 

export const Badges = ({ children, className = '', variant = 'default' } : BadgesProps) => {
    const baseClasses = "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium transition-colors";
    
    const variants = {
      default: "bg-white/10 text-white hover:bg-white/20",
      outline: "border border-white/20 text-white",
      secondary: "bg-white/5 text-gray-300 hover:bg-white/10"
    };
  
    return (
      <span className={`${baseClasses} ${variants[variant]} ${className}`}>
        {children}
      </span>
    );
  };