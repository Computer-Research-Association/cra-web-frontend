import ItemContainer from '~/components/Item/ItemContainer';
import { ITEMCATEGORY } from '~/constants/itemCategory';

export default function BookPage() {
  return <ItemContainer category={ITEMCATEGORY.BOOK} />;
}
