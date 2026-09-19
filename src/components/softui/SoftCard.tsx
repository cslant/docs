import React, { CSSProperties, ReactNode } from 'react';
import Link from '@docusaurus/Link';
import clsx from 'clsx';
import styles from './softui.module.css';
import { useReveal } from './useReveal';

interface SoftCardProps {
  children: ReactNode;
  className?: string;
  href?: string;
  external?: boolean;
  topBar?: boolean;
  hover?: boolean;
  reveal?: boolean;
  delay?: number;
  style?: CSSProperties;
  onClick?: () => void;
}

export default function SoftCard({
  children,
  className,
  href,
  external,
  topBar = true,
  hover = true,
  reveal = true,
  delay = 0,
  style,
  onClick,
}: SoftCardProps) {
  const { ref, isVisible } = useReveal<HTMLElement>(delay);

  const classes = clsx(
    styles.softCard,
    topBar && styles.softCardTopBar,
    hover && styles.softCardHover,
    reveal && styles.reveal,
    reveal && isVisible && styles.revealVisible,
    className
  );

  const revealStyle: CSSProperties | undefined = reveal
    ? { ...style, transitionDelay: `${delay}s` }
    : style;

  if (href && external) {
    return (
      <a
        ref={ref as never}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        style={revealStyle}
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link ref={ref as never} to={href} className={classes} style={revealStyle} onClick={onClick}>
        {children}
      </Link>
    );
  }

  return (
    <div ref={ref as never} className={classes} style={revealStyle} onClick={onClick}>
      {children}
    </div>
  );
}