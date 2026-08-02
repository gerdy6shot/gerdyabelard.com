import React from 'react';

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: 'subtle' | 'medium' | 'heavy';
  border?: boolean;
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  children,
  className = '',
  border = true,
}) => {
  return (
    <div
      className={`bg-[#111111]/90 backdrop-blur-md ${
        border ? 'border border-[#22222c]' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
