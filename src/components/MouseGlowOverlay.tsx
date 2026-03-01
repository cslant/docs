import React from 'react';
import type { MouseGlowState } from './useMouseGlow';

interface Props {
  glow: MouseGlowState;
  color?: string;
  radius?: number;
}

/**
 * Div overlay hiển thị radial gradient glow theo vị trí chuột.
 * Render bên trong container có position: relative.
 */
export default function MouseGlowOverlay({
  glow,
  color = 'rgba(46, 133, 85, 0.15)',
  radius = 600,
}: Props): React.ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        opacity: glow.visible ? 1 : 0,
        transition: 'opacity 0.35s ease',
        background: `radial-gradient(${radius}px circle at ${glow.x}px ${glow.y}px, ${color}, transparent 40%)`,
      }}
    />
  );
}

