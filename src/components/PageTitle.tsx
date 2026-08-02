import React from 'react';

interface PageTitleProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export const PageTitle: React.FC<PageTitleProps> = ({
  eyebrow,
  title,
  subtitle,
  className = '',
}) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {eyebrow && (
        <span className="text-[10px] font-mono tracking-[0.3em] text-[#c5a059] uppercase block">
          // {eyebrow}
        </span>
      )}
      <h1 className="font-serif-display text-3xl sm:text-4xl text-[#f4f3ef] tracking-[0.1em] uppercase">
        {title}
      </h1>
      {subtitle && (
        <p className="text-xs text-[#a1a1aa] font-sans-ui font-light leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  );
};
