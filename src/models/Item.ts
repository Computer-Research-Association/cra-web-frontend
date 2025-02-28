export interface ItemPageList {
  resListItemDtos: Item;
  totalPages: number;
}

export interface Item {
  id?: number;
  name: string;
  description: string;
  imageUrl: string;
  isBorrowed?: boolean;
  itemCategory: number;
  createdAt?: Date;
  updatedAt?: Date;
}
