'use client';

import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Retardo en segundos para escalonar elementos de una misma fila. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
};

/**
 * Revelado sutil al hacer scroll: sube 16px y aparece.
 * Si el usuario prefiere menos movimiento, se muestra sin animación.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const reduceMotion = useReducedMotion();
  const MotionTag = motion[as];

  if (reduceMotion) {
    const Tag = as;
    return <Tag className={className}>{children}</Tag>;
  }

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  );
}
