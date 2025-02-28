import LeftVector from '~/assets/images/Vector/LeftVector.png';
import RightVector from '~/assets/images/Vector/RightVector.png';
import styles from './Pagination.module.css';
import { useEffect } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  // 컴포넌트 마운트 시 sessionStorage에서 페이지 불러오기
  useEffect(() => {
    const storedPage = sessionStorage.getItem('currentPage');
    if (storedPage) {
      const pageIndex = parseInt(storedPage, 10);
      if (!isNaN(pageIndex) && pageIndex >= 0 && pageIndex < totalPages) {
        onPageChange(pageIndex);
      } else {
        sessionStorage.removeItem('currentPage');
      }
    }
  }, [onPageChange, totalPages]);

  const handlePageChange = (pageIndex: number) => {
    onPageChange(pageIndex);
    sessionStorage.setItem('currentPage', pageIndex.toString());
  };

  if (totalPages === 0) return null;

  return (
    <div className={styles.Pagenations}>
      <img src={LeftVector} loading="lazy" />
      {Array.from({ length: totalPages }).map((_, pageIndex) => (
        <div
          key={pageIndex}
          className={`${styles.PagenationsElipse} ${
            currentPage === pageIndex
              ? styles.PagenationsElipseSelected
              : styles.PagenationsElipseUnselected
          }`}
          onClick={() => handlePageChange(pageIndex)}
        >
          {pageIndex + 1}
        </div>
      ))}
      <img src={RightVector} loading="lazy" />
    </div>
  );
}

export default Pagination;
