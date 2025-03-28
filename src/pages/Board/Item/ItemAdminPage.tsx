import ItemAdminContainer from '~/components/Item/ItemAdminContainer';
import { ITEMCATEGORY } from '~/constants/itemCategory';

function ItemAdminPage() {
  return <ItemAdminContainer category={ITEMCATEGORY.ITEM} />;
}
export default ItemAdminPage;
