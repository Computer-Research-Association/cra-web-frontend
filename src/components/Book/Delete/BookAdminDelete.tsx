import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Item } from '~/models/Item.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { deleteItem } from '~/api/item.ts';
import { ITEMCATEGORY } from '~/constants/itemCategory.ts';
import styled from 'styled-components';

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--color-delete);
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function BookAdminDelete({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: async () => {
      queryClient.setQueryData<Item[]>(
        QUERY_KEY.item.items(ITEMCATEGORY.BOOK),
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((item) => item.id !== id);
        },
      );

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.item.items(ITEMCATEGORY.BOOK),
      });

      queryClient.getQueryData<Item[]>(QUERY_KEY.item.items(ITEMCATEGORY.BOOK));
    },
    onError: (error) => {
      console.error('도서 삭제 실패', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return <DeleteButton onClick={handleDelete}>삭제</DeleteButton>;
}

export default BookAdminDelete;
