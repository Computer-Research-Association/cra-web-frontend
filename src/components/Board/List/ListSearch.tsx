import React from 'react';
import styles from './ListSearch.module.css'; // 스타일 임포트

interface ListSearchProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

const ListSearch: React.FC<ListSearchProps> = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (
    <div className={styles['search-container']}>
      <input
        type="text"
        className={styles['search-input']}
        placeholder="검색어를 입력하세요..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
};

export default ListSearch;
