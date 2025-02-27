import LeftVector from '~/assets/images/Vector/LeftVector.png';
import RightVector from '~/assets/images/Vector/RightVector.png';
import styles from './Pagination.module.css';

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
  const handlePageChange = (pageIndex: number) => {
    onPageChange(pageIndex);
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
