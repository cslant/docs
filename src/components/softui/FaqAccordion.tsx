import React, { JSX, ReactNode } from 'react';
import styles from './softui.module.css';

interface FaqItem {
  question: string;
  answer: ReactNode;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps): JSX.Element {
  return (
    <div className={styles.faqList}>
      {items.map((item, idx) => (
        <details key={idx} className={styles.faqItem}>
          <summary className={styles.faqSummary}>
            {item.question}
            <span className={styles.faqToggle} aria-hidden="true">
              +
            </span>
          </summary>
          <div className={styles.faqBody}>{item.answer}</div>
        </details>
      ))}
    </div>
  );
}