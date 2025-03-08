import { Item } from '~/models/Item.ts';
import Pagination from '~/components/Pagination/Pagination';
import ItemItem from '../Item/ItemItem';
import { ITEM_CATEGORY_STRINGS } from '~/constants/item_category_strings';
import styles from './ItemList.module.css';

interface ItemListProps {
  category: number;
  itemsQuery: Item[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

export default function ItemList({
  category,
  itemsQuery,
  totalPages,
  currentPage,
  onPageChange,
}: ItemListProps) {
  // category 값에 따라 다른 클래스명 사용
  const getBoardListClassName = () => {
    return category === 0 ? styles.itemBoardList : styles.bookBoardList;
  };

  const renderBoardContent = () => {
    if (itemsQuery != null) {
      return itemsQuery
        .filter((item) => item.id !== undefined)
        .map((item, index) => (
          <div key={`board-${item.id}`}>
            <div className={styles['board-wrapper']}>
              <ItemItem category={category} item={item} />
            </div>
            {index < itemsQuery.length - 1 && (
              <div className={styles.divider}></div>
            )}
          </div>
        ));
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{ITEM_CATEGORY_STRINGS[category]}</h2>
      <div className={getBoardListClassName()}>{renderBoardContent()}</div>
      <div className={styles['board-list-footer']}>
        <div className={styles.pagination}>
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
}
