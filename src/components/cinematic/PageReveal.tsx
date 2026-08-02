import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';

interface PageRevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'none';
  className?: string;
}

export const PageReveal: React.FC<PageRevealProps> = ({
  children,
  delay = 0,
  duration = 0.9,
  direction = 'up',
  className = '',
  ...rest
}) => {
  const yOffset = direction === 'up' ? 24 : direction === 'down' ? -24 : 0;

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: yOffset,
        scale: 0.995,
      }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1], // Editorial cinematic curve
      }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
};
