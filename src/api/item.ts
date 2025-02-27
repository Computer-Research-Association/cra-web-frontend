import { Item, ItemPageList } from '~/models/Item.ts';
import { authClient } from './auth/authClient.ts';

// 페이지네이션 적용된 아이템 불러오기
export const getItems = async (
  itemCategory: number,
  page: number = 1,
  perPage: number = 12,
): Promise<ItemPageList> => {
  try {
    const response = await authClient.get<ItemPageList>(
      `/item/${itemCategory}/page`,
      {
        params: {
          page,
          perPage,
          isASC: false,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getItemById = async (id: number) => {
  try {
    const response = await authClient.get<Item>(`/item/view/${id}`);
    const Item = response.data;

    return {
      ...Item,
      // undefined 체크 후 기본값 설정
      createdAt: Item.createdAt ? new Date(Item.createdAt) : new Date(),
    };
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createItems = async (item: Item) => {
  try {
    const response = await authClient.post<Item>('/admin/item', item, {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateItem = async (item: Item) => {
  try {
    const response = await authClient.put<Item>(
      `/admin/item/${item.id}`,
      item,
      {
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteItem = async (id: number) => {
  try {
    await authClient.delete(`/admin/item/${id}`);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
