/* eslint-disable */
// @ts-nocheck

import histories from '~/Data/histories.json';

import React, { useState, useRef } from 'react';
import styles from './IntroHistory.module.css';
import styled from 'styled-components';

const Li = styled.li`
  font-size: 16px;
  width: 100%;
  padding: 2rem 0;
  border-bottom: 1px solid var(--color-bright-stroke);
`;

const Span = styled.span`
  color: var(--color-primary);
  font-family: 'Pretendard Bold' !important;
`;

const ToggleButton = styled.button`
  width: 40%;
  padding: 1rem;
  margin: 2rem auto;
  font-size: 20px;
  background-color: transparent;
  border: 1px solid var(--color-bright-stroke);
  color: var(--color-primary);
  font-family: 'Pretendard Bold';
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  display: block;

  &:hover {
    background-color: var(--color-primary);
    color: white;
  }

  @media (max-width: 768px) {
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

function highlightText(text: string): React.ReactNode {
  const parts = text.split(/(#.*?#)/g);

  return parts.map((part, index) => {
    if (part.startsWith('#') && part.endsWith('#')) {
      return <Span key={index}>{part.slice(1, -1)}</Span>;
    }
    return part;
  });
}

function IntroHistory() {
  const [showMore, setShowMore] = useState(false);
  const historyRef = useRef<HTMLDivElement>(null);

  const handleToggle = (show: boolean) => {
    if (!show) {
      historyRef.current?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
      setTimeout(() => {
        setShowMore(show);
      }, 700);
    } else {
      setShowMore(show);
    }
  };

  return (
    <div className={styles.History} ref={historyRef}>
      <p className={styles.HistoryTitle}>HISTORY</p>
      <ul className={styles.HistoryUL}>
        {histories.data
          .slice(0, showMore ? histories.data.length : 3)
          .map((item, index) => (
            <Li key={index}>
              <span className={styles.HistoryYear}>{item.year}</span>{' '}
              {highlightText(item.title, item.highlightWords)}
              {item.content.map((contentItem, contentIndex) => (
                <p key={contentIndex} className={styles.HistoryListElement}>
                  {highlightText(contentItem, item.highlightWords)}
                </p>
              ))}
            </Li>
          ))}
      </ul>

      {!showMore && (
        <ToggleButton onClick={() => handleToggle(true)}>더보기</ToggleButton>
      )}
      {showMore && (
        <ToggleButton onClick={() => handleToggle(false)}>접기</ToggleButton>
      )}
    </div>
  );
}

export default IntroHistory;
