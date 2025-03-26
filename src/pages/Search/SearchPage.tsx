import SearchContainer from '~/components/Search/SearchContainer';
import { CATEGORY } from '~/constants/category.ts';

export default function SearchPage() {
  return <SearchContainer category={CATEGORY.NOTICE} />;
}
