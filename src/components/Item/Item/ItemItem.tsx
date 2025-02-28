import { Item } from '~/models/Item.ts';
import styles from '~/components/Item/Item/ItemItem.module.css';

export default function ItemItem({ item }: { item: Item }) {
  return (
    <>
      <div className={styles['project-block']}>
        <div className={styles['project-picture']}>
          <img
            src={item.imageUrl}
            className={styles['project-picture']}
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
