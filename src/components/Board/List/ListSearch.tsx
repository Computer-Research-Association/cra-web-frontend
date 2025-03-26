import React from 'react';
import styles from './ListSearch.module.css'; // 스타일 임포트

interface ListSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  onKeyDown: (_e: React.KeyboardEvent<HTMLInputElement>) => void; // 이거 왜 뜨는지 모르겠음
}

const ListSearch: React.FC<ListSearchProps> = ({
  searchTerm,
  setSearchTerm,
  onKeyDown,
}) => {
  return (
    <div className={styles['search-container']}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default ListSearch;
