import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getItems } from '~/api/item.ts';
import { ItemPageList, Item } from '~/models/Item.ts';
import LoadingSpinner from '../Common/LoadingSpinner.tsx';
import ItemAdminList from './List/ItemAdminList.tsx';

function ItemAdminContainer({ category }: { category: number }) {
  const [currentPage, setCurrentPage] = useState(0);

  const itemsQuery = useQuery<ItemPageList>({
    queryKey: QUERY_KEY.item.items(category, currentPage),
    queryFn: async () => getItems(category, currentPage),
  });

  if (itemsQuery.isLoading) return <LoadingSpinner />;
  if (itemsQuery.isError) return <p>Error: {itemsQuery.error?.message}</p>;

  const items = Array.isArray(itemsQuery.data?.resListItemDtos)
    ? itemsQuery.data.resListItemDtos
    : [];
  const totalPage = itemsQuery.data?.totalPages || 1;

  return (
    <ItemAdminList
      category={category}
      items={items as Item[]}
      totalPages={totalPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default ItemAdminContainer;
