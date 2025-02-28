import React, { useEffect } from 'react';
import { UseQueryResult } from '@tanstack/react-query';
import { Havruta } from '~/models/Havruta.ts';
import SelectedDot from '~/assets/images/Dot/Selected-Dot.png';
import styles from './HavrutaSidebar.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

interface HavrutaSidebarProps {
  havrutaQuery: UseQueryResult<Havruta[], unknown>;
  selectedHavrutaId: number | null;
  onHavrutaChange: (_id: number | null) => void;
  onPageChange: (_page: number) => void;
}

function HavrutaSidebar({
  havrutaQuery,
  selectedHavrutaId,
  onHavrutaChange,
  onPageChange,
}: HavrutaSidebarProps) {
  // 컴포넌트 마운트 시 sessionStorage에서 havruta 값 불러오기
  useEffect(() => {
    const savedHavrutaId = sessionStorage.getItem('havruta');
    if (savedHavrutaId) {
      const havrutaId = parseInt(savedHavrutaId, 10);
      const isValidHavruta = havrutaQuery.data?.some(
        (havruta) => havruta.id === havrutaId,
      );
      if (isValidHavruta) {
        onHavrutaChange(havrutaId);
      } else {
        sessionStorage.removeItem('havruta'); // 유효하지 않은 경우 제거
      }
    }
  }, [havrutaQuery.data, onHavrutaChange]);

  if (havrutaQuery.isLoading) return <LoadingSpinner />;
  if (havrutaQuery.isError) return <div>ERROR!</div>;

  const handleHavrutaChange = (id: number | null, event: React.MouseEvent) => {
    event.preventDefault(); // 클릭 시 기본 동작 방지
    onHavrutaChange(id);

    if (id === null) {
      sessionStorage.removeItem('havruta'); // 전체 선택 시 제거
    } else {
      sessionStorage.setItem('havruta', String(id));
    }
    sessionStorage.setItem('currentPage', '0');

    onPageChange(0); // 페이지를 1로 설정 (0 -> 페이지 1)
  };

  return (
    <ul className={styles.menu}>
      <h2>과목 목록</h2>
      <li
        className={`${styles.menuItem} ${
          selectedHavrutaId === null ? styles.selected : ''
        }`}
      >
        <img src={SelectedDot} loading="lazy" alt="Selected" />
        <a href="#" onClick={(event) => handleHavrutaChange(null, event)}>
          전체
        </a>
      </li>
      {havrutaQuery.data?.map((havruta) => (
        <li
          key={havruta.id}
          className={`${styles.menuItem} ${
            selectedHavrutaId === havruta.id ? styles.selected : ''
          }`}
        >
          <img src={SelectedDot} loading="lazy" alt="Selected" />
          <a
            href="#"
            onClick={(event) => handleHavrutaChange(havruta.id ?? null, event)}
          >
            {havruta.className} ({havruta.professor})
          </a>
        </li>
      ))}
    </ul>
  );
}

export default HavrutaSidebar;
