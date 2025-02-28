import { Link } from 'react-router-dom';
import { Item } from '~/models/Item.ts';
import ItemAdminDelete from '~/components/Item/Delete/ItemAdminDelete.tsx';
import styled from 'styled-components';
import Pagination from '~/components/Pagination/Pagination';
import { ITEM_CATEGORY_STRINGS_EN } from '~/constants/item_category_strings_en';
import { ITEM_CATEGORY_STRINGS } from '~/constants/item_category_strings';

const Container = styled.div`
  padding: 10rem;
`;

const ActionLink = styled(Link)`
  padding: 0.25rem 0.5rem;
  color: var(--color-more-primary);
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButtonWrapper = styled.div`
  display: inline-block;
  padding: 0.25rem 0.5rem;
`;

const CreateItemLink = styled(Link)`
  color: var(--color-primary);
  font-size: 1.25rem;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const BoardTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0;
`;

const Th = styled.th`
  border-bottom: 2px solid black;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border-bottom: 1px solid var(--color-bright-stroke);
  padding: 10px;
`;

interface ItemListProps {
  category: number;
  items: Item[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

function ItemAdminList({
  category,
  items,
  totalPages,
  currentPage,
  onPageChange,
}: ItemListProps) {
  return (
    <Container>
      <h1>관리자 {ITEM_CATEGORY_STRINGS[category]} 페이지</h1>
      <BoardTable>
        <thead>
          <tr>
            <Th>ID</Th>
            <Th>이름</Th>
            <Th>설명</Th>
            <Th>작업</Th>
          </tr>
        </thead>
        <tbody>
          {items.map((itemElement) => (
            <tr key={itemElement.id}>
              <Td>{itemElement.id}</Td>
              <Td>{itemElement.name}</Td>
              <Td>{itemElement.description}</Td>
              <Td>
                <ActionLink
                  to={`/admin/${ITEM_CATEGORY_STRINGS_EN[category]}/view/${itemElement.id}`}
                >
                  자세히 보기
                </ActionLink>
                |
                <ActionLink
                  to={`/admin/${ITEM_CATEGORY_STRINGS_EN[category]}/edit/${itemElement.id}`}
                >
                  수정
                </ActionLink>
                |
                <DeleteButtonWrapper>
                  <ItemAdminDelete id={itemElement.id!} />
                </DeleteButtonWrapper>
              </Td>
            </tr>
          ))}
        </tbody>
      </BoardTable>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
      <CreateItemLink to={`/admin/${ITEM_CATEGORY_STRINGS_EN[category]}/write`}>
        새 {ITEM_CATEGORY_STRINGS[category]} 생성
      </CreateItemLink>
    </Container>
  );
}

export default ItemAdminList;
