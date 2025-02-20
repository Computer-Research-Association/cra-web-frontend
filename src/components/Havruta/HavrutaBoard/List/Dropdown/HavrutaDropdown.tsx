import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UseQueryResult } from '@tanstack/react-query';
import { Havruta } from '~/models/Havruta.ts';
import styles from './HavrutaDropdown.module.css';

interface HavrutaDropdownProps {
  havrutaQuery: UseQueryResult<Havruta[], unknown>;
  selectedHavrutaId: number | null;
  onHavrutaChange: (_id: number | null) => void;
  onPageChange: (_page: number) => void;
}

function HavrutaDropdown({
  havrutaQuery,
  selectedHavrutaId,
  onHavrutaChange,
  onPageChange,
}: HavrutaDropdownProps) {
  const navigate = useNavigate();

  if (havrutaQuery.isLoading) return <div>로딩중...</div>;
  if (havrutaQuery.isError) return <div>ERROR!</div>;

  const handleHavrutaChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const id =
      event.target.value === 'all' ? null : parseInt(event.target.value);
    onHavrutaChange(id);
    onPageChange(0); // 페이지를 1로 설정 (0 -> 페이지 1)
    void navigate(`?havrutaId=${id ? id : 'all'}&page=1`); // havrutaID와 page를 쿼리 파라미터로 추가
  };

  return (
    <div className={styles.container}>
      <select
        value={selectedHavrutaId ?? 'all'}
        onChange={handleHavrutaChange}
        className={styles.dropdown}
      >
        <option value="all">전체</option>
        {havrutaQuery.data?.map((havruta) => (
          <option key={havruta.id} value={havruta.id}>
            {havruta.className} ({havruta.professor})
          </option>
        ))}
      </select>
    </div>
  );
}

export default HavrutaDropdown;
