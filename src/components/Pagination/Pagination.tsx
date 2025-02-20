import LeftVector from '~/assets/images/Vector/LeftVector.png';
import RightVector from '~/assets/images/Vector/RightVector.png';
import styles from './Pagination.module.css';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const handlePageChange = (pageIndex: number) => {
    onPageChange(pageIndex);
    void navigate(
      `?havrutaId=${new URLSearchParams(window.location.search).get('havrutaId') ? new URLSearchParams(window.location.search).get('havrutaId') : 'all'}&page=${pageIndex + 1}`,
    );
  };

  if (totalPages === 0) return null;

  return (
    <div className={styles.Pagenations}>
      <img src={LeftVector} />
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
      <img src={RightVector} />
    </div>
  );
}

export default Pagination;
