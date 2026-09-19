import React, { JSX, ReactNode } from 'react';
import clsx from 'clsx';
import styles from './softui.module.css';

interface TimelineItem {
  period?: string;
  title: string;
  description?: ReactNode;
  tags?: string[];
}

interface TimelineProps {
  items: TimelineItem[];
}

export default function Timeline({ items }: TimelineProps): JSX.Element {
  return (
    <div className={styles.timeline}>
      {items.map((item, idx) => (
        <div key={idx} className={clsx(styles.timelineItem, styles.softCard, styles.softCardTopBar)}>
          <span className={styles.timelineDot} aria-hidden="true" />
          {item.period && <div className={styles.timelineMeta}>{item.period}</div>}
          <h3 className={styles.timelineTitle}>{item.title}</h3>
          {item.description && <p className={styles.timelineDesc}>{item.description}</p>}
          {item.tags && item.tags.length > 0 && (
            <div className={styles.timelineTags}>
              {item.tags.map((tag, i) => (
                <span key={i} className={styles.tagChip}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}