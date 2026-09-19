import React, { CSSProperties, JSX } from 'react';
import Link from '@docusaurus/Link';
import styles from './softui.module.css';

interface CtaAction {
  label: string;
  href: string;
  external?: boolean;
}

interface CtaBannerProps {
  title: string;
  subtitle?: string;
  primary?: CtaAction;
  secondary?: CtaAction;
  accent?: string;
}

function CtaButton({ action, variant }: { action: CtaAction; variant: 'primary' | 'ghost' }) {
  const className = variant === 'primary' ? styles.softBtnPrimary : styles.softBtnGhost;
  if (action.external) {
    return (
      <a href={action.href} target="_blank" rel="noopener noreferrer" className={className}>
        {action.label}
      </a>
    );
  }
  return (
    <Link to={action.href} className={className}>
      {action.label}
    </Link>
  );
}

export default function CtaBanner({ title, subtitle, primary, secondary, accent }: CtaBannerProps): JSX.Element {
  const rootStyle: CSSProperties | undefined = accent
    ? ({ '--nm-accent': accent } as CSSProperties)
    : undefined;

  return (
    <div className={styles.ctaBanner} style={rootStyle}>
      <h3 className={styles.ctaTitle}>{title}</h3>
      {subtitle && <p className={styles.ctaSubtitle}>{subtitle}</p>}
      {(primary || secondary) && (
        <div className={styles.ctaButtons}>
          {primary && <CtaButton action={primary} variant="primary" />}
          {secondary && <CtaButton action={secondary} variant="ghost" />}
        </div>
      )}
    </div>
  );
}