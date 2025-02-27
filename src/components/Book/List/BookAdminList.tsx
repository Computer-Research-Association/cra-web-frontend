import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Link } from 'react-router-dom';
import { Item } from '~/models/Item.ts';
import { getItems } from '~/api/item.ts';
import { ITEMCATEGORY } from '~/constants/itemCategory.ts';
import ItemAdminDelete from '~/components/Book/Delete/BookAdminDelete.tsx';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

const Container = styled.div`
  padding: 10rem;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin: 2rem 0rem;
  font-size: 1rem;
  text-align: left;
`;

const Th = styled.th`
  border-bottom: 2px solid black;
  padding: 10px;
`;

const Td = styled.td`
  border-bottom: 1px solidvar(--color-bright-stroke);
  padding: 10px;
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
  padding: 0.25rem 0.5rem;
  display: inline-block;
`;

const CreateItemLink = styled(Link)`
  color: var(--color-primary);
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function BookAdminList() {
  const itemQuery = useQuery<Item[]>({
    queryKey: QUERY_KEY.item.items(ITEMCATEGORY.BOOK),
    queryFn: async () => getItems(ITEMCATEGORY.BOOK),
  });

  let content;

  if (itemQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (itemQuery.isError) {
    content = <div>에러가 발생했습니다!</div>;
  } else if (itemQuery.isSuccess) {
    if (itemQuery.data.length === 0) {
      alert('서버 통신 가능, 아직 데이터 없음');
    } else {
      content = (
        <Table>
          <thead>
            <tr>
              <Th>id</Th>
              <Th>제품명</Th>
              <Th>설명</Th>
              <Th>대여 가능 여부</Th>
            </tr>
          </thead>
          <tbody>
            {itemQuery.data.map((itemElement) => (
              <tr key={itemElement.id}>
                <Td>{itemElement.id}</Td>
                <Td>{itemElement.name}</Td>
                <Td>{itemElement.description}</Td>
                <Td>
                  {itemElement.isBorrowed ? (
                    <span>대여 불가능</span>
                  ) : (
                    <span>대여 가능</span>
                  )}
                </Td>

                <Td>
                  <ActionLink to={`/admin/book/view/${itemElement.id}`}>
                    자세히 보기
                  </ActionLink>
                  |
                  <ActionLink to={`/admin/book/edit/${itemElement.id}`}>
                    수정
                  </ActionLink>
                  |{' '}
                  <DeleteButtonWrapper>
                    <ItemAdminDelete id={itemElement.id!} />
                  </DeleteButtonWrapper>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      );
    }
  }

  return (
    <Container>
      <h1>관리자 도서 페이지</h1>
      {content}
      <CreateItemLink to="/admin/book/write">새 도서 추가</CreateItemLink>
    </Container>
  );
}

export default BookAdminList;
