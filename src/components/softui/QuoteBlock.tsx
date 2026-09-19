import React, { JSX } from 'react';
import styles from './softui.module.css';

interface QuoteBlockProps {
  quote: string;
  author?: string;
  role?: string;
}

export default function QuoteBlock({ quote, author, role }: QuoteBlockProps): JSX.Element {
  return (
    <div className={styles.quoteBlock}>
      <div className={styles.quoteGlyph} aria-hidden="true">
        “
      </div>
      <p className={styles.quoteText}>{quote}</p>
      {(author || role) && (
        <footer>
          {author && <span className={styles.quoteAuthor}>{author}</span>}
          {author && role && ' · '}
          {role && <span className={styles.quoteRole}>{role}</span>}
        </footer>
      )}
    </div>
  );
}