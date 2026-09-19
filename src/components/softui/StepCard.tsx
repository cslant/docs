import React, { JSX, ReactNode, useState } from 'react';
import clsx from 'clsx';
import styles from './softui.module.css';
import { useReveal } from './useReveal';

interface StepCardProps {
  step: number | string;
  title: string;
  description?: ReactNode;
  code?: string;
  delay?: number;
}

export default function StepCard({ step, title, description, code, delay = 0 }: StepCardProps): JSX.Element {
  const { ref, isVisible } = useReveal<HTMLDivElement>(delay);
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    if (!code) return;
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div
      ref={ref}
      className={clsx(styles.softCard, styles.softCardTopBar, styles.reveal, isVisible && styles.revealVisible)}
      style={{ transitionDelay: `${delay}s` }}
    >
      <div className={styles.stepBadge}>{step}</div>
      <h3 className={styles.stepTitle}>{title}</h3>
      {description && <div className={styles.stepDesc}>{description}</div>}
      {code && (
        <div className={styles.codeBlockWrap}>
          <button type="button" onClick={copyToClipboard} className={styles.copyButton}>
            {copied ? '✓ Copied!' : '📋 Copy'}
          </button>
          <pre className={styles.codeBlock}>
            <code>{code}</code>
          </pre>
        </div>
      )}
    </div>
  );
}