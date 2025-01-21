import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Item } from '~/models/Item';
import { getItemById } from '~/api/item';

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

function ItemAdminDetail() {
  const { id } = useParams<{ id: string }>();
  const ItemId = Number(id);

  const itemQuery = useQuery<Item>({
    queryKey: QUERY_KEY.item.itemById(ItemId),
    queryFn: async () => getItemById(ItemId),
  });

  let content;

  if (itemQuery.isLoading) {
    content = <div className="loading">데이터를 불러오는 중입니다...</div>;
  } else if (itemQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (itemQuery.isSuccess) {
    const item = itemQuery.data;
    return (
      <Container>
        <h1>비품 자세히 보기</h1>
        <Content>
          <Bold>ID:</Bold> {item.id}
        </Content>
        <Content>
          <Bold>이름:</Bold> {item.name}
        </Content>
        <Content>
          <Bold>설명:</Bold> {item.description}
        </Content>
        <Content>
          <Bold>이미지 URLs:</Bold> {item.imageUrl}
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

export default ItemAdminDetail;
