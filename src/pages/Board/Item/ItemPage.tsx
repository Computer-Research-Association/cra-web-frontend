import ItemContainer from '~/components/Item/ItemContainer.tsx';
import { ITEMCATEGORY } from '~/constants/itemCategory.ts';

export default function ItemPage() {
  return <ItemContainer category={ITEMCATEGORY.ITEM} />;
}
