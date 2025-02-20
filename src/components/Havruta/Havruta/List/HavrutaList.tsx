import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey';
import { Link } from 'react-router-dom';
import { Havruta } from '~/models/Havruta';
import { getAllHavrutas } from '~/api/havruta/havruta';
import HavrutaDelete from '~/components/Havruta/Havruta/Delete/HavrutaDelete';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

const Container = styled.div``;

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
  border-bottom: 1px solid #ddd;
  padding: 10px;
`;

const ActionLink = styled(Link)`
  padding: 0.25rem 0.5rem;
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

const DeleteButtonWrapper = styled.div`
  padding: 0.25rem 0.5rem;
  display: inline-block;
`;

const CreateHavrutaLink = styled(Link)`
  color: #2cb4db;
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

//클래스명 교수명 불러오기
function HavrutaList() {
  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getAllHavrutas(),
  });

  let content;

  if (havrutaQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (havrutaQuery.isError) {
    content = <div>에러가 발생했습니다!</div>;
  } else if (havrutaQuery.isSuccess) {
    if (havrutaQuery.data.length === 0) {
      console.log('서버 통신 가능, 아직 데이터 없음');
    } else {
      content = (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>과목명</Th>
              <Th>교수명</Th>
            </tr>
          </thead>
          <tbody>
            {havrutaQuery.data.map((havrutaElement) => (
              <tr key={havrutaElement.id}>
                <Td>{havrutaElement.id}</Td>
                <Td>{havrutaElement.className}</Td>
                <Td>{havrutaElement.professor}</Td>
                <Td>
                  <ActionLink to={`/admin/havruta/edit/${havrutaElement.id}`}>
                    수정
                  </ActionLink>
                  |
                  <DeleteButtonWrapper>
                    <HavrutaDelete id={havrutaElement.id!} />
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
      <h1>관리자 Havruta 페이지</h1>
      {content}
      <CreateHavrutaLink to="./admin/havruta/write">
        새 하브루타 생성
      </CreateHavrutaLink>
    </Container>
  );
}
export default HavrutaList;
