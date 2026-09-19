import React, { CSSProperties, JSX } from 'react';
import styles from './softui.module.css';

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  accent?: string;
}

export default function SectionHeader({ title, subtitle, accent }: SectionHeaderProps): JSX.Element {
  const accentStyle: CSSProperties | undefined = accent
    ? { backgroundImage: accent }
    : undefined;

  return (
    <div className={styles.sectionHeader}>
      <h2 className={styles.sectionTitle} style={accentStyle}>
        {title}
      </h2>
      {subtitle && <p className={styles.sectionSubtitle}>{subtitle}</p>}
    </div>
  );
}