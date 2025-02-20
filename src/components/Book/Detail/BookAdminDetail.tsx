import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Item } from '~/models/Item.ts';
import { getItemById } from '~/api/item.ts';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

const Container = styled.div`
  padding: 10rem;
`;
const Content = styled.div`
  padding: 1rem 0;
  font-size: 1rem;
`;

const Bold = styled.b`
  padding-right: 0.25rem;
`;

function BookAdminDetail() {
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const ItemId = Number(id);

  const itemQuery = useQuery<Item>({
    queryKey: QUERY_KEY.item.itemById(ItemId),
    queryFn: async () => getItemById(ItemId),
  });

  let content;

  if (itemQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (itemQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (itemQuery.isSuccess) {
    const item = itemQuery.data;
    return (
      <Container>
        <h1>도서 자세히 보기</h1>
        <Content>
          <Bold>ID:</Bold> {item.id}
        </Content>
        <Content>
          <Bold>도서명:</Bold> {item.name}
        </Content>
        <Content>
          <Bold>설명:</Bold> {item.description}
        </Content>
        <Content>
          <Bold>이미지 URL:</Bold> {item.imageUrl}
        </Content>
        <Content>
          <Bold>대여 가능 여부:</Bold>{' '}
          {item.isBorrowed ? <span>대여 중</span> : <span>대여 가능</span>}
        </Content>
      </Container>
    );
  }

  return <div>{content}</div>;
}

export default BookAdminDetail;
