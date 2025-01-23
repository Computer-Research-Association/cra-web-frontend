import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey';
import styled from 'styled-components';
import { deleteItem } from '~/api/item';
import { Item } from '~/models/Item';
import { ITEMCATEGORY } from '~/constants/itemCategory';

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #da2b2b;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function ItemAdminDelete({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteItem(id),
    onSuccess: async () => {
      alert('비품 삭제 성공');
      queryClient.setQueryData<Item[]>(
        QUERY_KEY.item.items(ITEMCATEGORY.ITEM),
        (oldData) => {
          console.log('Old Cached Data Before Update:', oldData);
          if (!oldData) return [];
          return oldData.filter((item) => item.id !== id);
        },
      );

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.item.items(ITEMCATEGORY.ITEM),
      });

      const updatedData = queryClient.getQueryData<Item[]>(
        QUERY_KEY.item.items(ITEMCATEGORY.ITEM),
      );
      console.log('Updated Cached Data:', updatedData);
    },
    onError: (error) => {
      console.error('비품 삭제 실패', error);
      alert('비품 삭제 실패');
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return <DeleteButton onClick={handleDelete}>삭제</DeleteButton>;
}

export default ItemAdminDelete;
