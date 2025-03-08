import ItemAdminContainer from '~/components/Item/ItemAdminContainer';
import { ITEMCATEGORY } from '~/constants/itemCategory';

function BookAdminPage() {
  return <ItemAdminContainer category={ITEMCATEGORY.BOOK} />;
}
export default BookAdminPage;
