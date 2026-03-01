import { useCallback, useState } from 'react';

export interface MouseGlowState {
  x: number;
  y: number;
  visible: boolean;
}

/**
 * Hook to create a mouse glow effect on a container element.
 * Return stage and event handlers to track mouse position and visibility.
 * Use onMouseMove to update glow position and onMouseLeave to hide the glow.
 * The glow state can be used to render a radial gradient overlay at the mouse position.
 */
export function useMouseGlow() {
  const [glow, setGlow] = useState<MouseGlowState>({ x: 0, y: 0, visible: false });

  const onMouseMove = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setGlow({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const onMouseLeave = useCallback(() => {
    setGlow(prev => ({ ...prev, visible: false }));
  }, []);

  return { glow, onMouseMove, onMouseLeave };
}

export default useMouseGlow;

