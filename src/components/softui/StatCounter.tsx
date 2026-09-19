import React, { JSX, useEffect, useState } from 'react';
import clsx from 'clsx';
import styles from './softui.module.css';
import { useReveal } from './useReveal';

interface StatCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  emoji?: string;
  duration?: number;
  delay?: number;
}

export default function StatCounter({
  value,
  label,
  prefix = '',
  suffix = '',
  emoji,
  duration = 1600,
  delay = 0,
}: StatCounterProps): JSX.Element {
  const { ref, isVisible } = useReveal<HTMLDivElement>(delay);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isVisible, value, duration]);

  return (
    <div
      ref={ref}
      className={clsx(styles.statItem, styles.reveal, isVisible && styles.revealVisible)}
      style={{ transitionDelay: `${delay}s` }}
    >
      {emoji && <span className={styles.statEmoji}>{emoji}</span>}
      <div className={styles.statValue}>
        {prefix}
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className={styles.statLabel}>{label}</div>
    </div>
  );
}