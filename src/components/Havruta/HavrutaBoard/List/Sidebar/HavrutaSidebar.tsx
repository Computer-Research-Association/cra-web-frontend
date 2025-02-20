import React from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  if (havrutaQuery.isLoading) return <LoadingSpinner />;
  if (havrutaQuery.isError) return <div>ERROR!</div>;

  const handleHavrutaChange = (id: number | null, event: React.MouseEvent) => {
    event.preventDefault(); // 클릭 시 기본 동작 방지 (URL에 # 추가 방지)
    onHavrutaChange(id);
    onPageChange(0); // 페이지를 1로 설정 (0 -> 페이지 1)
    void navigate(`?havrutaId=${id ? id : 'all'}&page=1`); // havrutaID와 page를 쿼리 파라미터로 추가
  };

  return (
    <ul className={styles.menu}>
      <h2>과목 목록</h2>
      <li
        className={`${styles.menuItem} ${
          selectedHavrutaId === null ? styles.selected : ''
        }`}
      >
        <img src={SelectedDot} />
        <a
          href="#"
          onClick={(event) => handleHavrutaChange(null, event)} // 전체 선택 시
        >
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
          <img src={SelectedDot} />
          <a
            href="#"
            onClick={(event) => handleHavrutaChange(havruta.id ?? null, event)} // 개별 과목 선택 시
          >
            {havruta.className} ({havruta.professor})
          </a>
        </li>
      ))}
    </ul>
  );
}

export default HavrutaSidebar;
