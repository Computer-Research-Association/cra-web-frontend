import { useQuery } from '@tanstack/react-query';
import { getItems } from '~/api/item.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Item } from '~/models/Item.ts';
import ItemItem from '~/components/Item/Item/ItemItem.tsx';
import styles from '~/components/Item/List/ItemList.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

export default function ItemList({ itemCategory }: { itemCategory: number }) {
  const ItemQuery = useQuery<Item[]>({
    queryKey: QUERY_KEY.item.items(itemCategory),
    queryFn: async () => getItems(itemCategory),
  });

  let content;

  if (ItemQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (ItemQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (ItemQuery.isSuccess) {
    content =
      ItemQuery.data.length === 0 ? (
        <div className="empty">데이터가 없습니다.</div>
      ) : (
        <div className={styles['background']}>
          <div className={styles['project-list-container']}>
            {ItemQuery.data.map((ItemElement) => (
              <ItemItem key={ItemElement.id} item={ItemElement} />
            ))}
          </div>
        </div>
      );
  }

  return <div className={styles['content']}>{content}</div>;
}
