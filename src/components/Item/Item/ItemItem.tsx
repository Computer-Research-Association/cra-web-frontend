import { Item } from '~/models/Item.ts';
import styles from '~/components/Item/Item/ItemItem.module.css';

interface ItemItemProps {
  item: Item;
  category: number;
}

export default function ItemItem({ item, category }: ItemItemProps) {
  const getBoardListClassName = () => {
    return category === 0 ? styles.itemPicture : styles.bookPicture;
  };
  return (
    <>
      <div className={styles['project-block']}>
        <div className={styles['picture-background']}>
          <img
            src={item.imageUrl}
            className={getBoardListClassName()}
            loading="lazy"
          />
        </div>
        <div className={styles['title']}>{item.name}</div>
        <div className={styles['content']}>{item.description}</div>
        <div>
          {item.isBorrowed ? (
            <span className={styles['borrow']}>Borrowed</span>
          ) : (
            <span className={styles['available']}>Available</span>
          )}
        </div>
      </div>
    </>
  );
}
