import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { getProjects } from '~/api/project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Project } from '~/models/Project.ts';
import ProjectDelete from '../Delete/ProjectAdminDelete.tsx';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner.tsx';

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

const CreateProjectLink = styled(Link)`
  color: #2cb4db;
  font-size: 1.25rem;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function ProjectAdminList() {
  const projectQuery = useQuery<Project[]>({
    queryKey: QUERY_KEY.project.projects(),
    queryFn: async () => getProjects(),
  });

  let content;

  if (projectQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (projectQuery.isError) {
    content = <div>에러가 발생했습니다!</div>;
  } else if (projectQuery.isSuccess) {
    if (projectQuery.data.length === 0) {
      console.log('서버 통신 가능, 아직 데이터 없음');
    } else {
      content = (
        <Table>
          <thead>
            <tr>
              <Th>ID</Th>
              <Th>학기</Th>
              <Th>팀 이름</Th>
              <Th>서비스 이름</Th>
              <Th>팀원</Th>
              <Th>작업</Th>
            </tr>
          </thead>
          <tbody>
            {projectQuery.data.map((projectElement) => (
              <tr key={projectElement.id}>
                <Td>{projectElement.id}</Td>
                <Td>{projectElement.semester}</Td>
                <Td>{projectElement.teamName}</Td>
                <Td>{projectElement.serviceName}</Td>
                <Td>{projectElement.members.join(', ')}</Td>
                <Td>
                  <ActionLink to={`/admin/project/view/${projectElement.id}`}>
                    자세히 보기
                  </ActionLink>
                  |
                  <ActionLink to={`/admin/project/edit/${projectElement.id}`}>
                    수정
                  </ActionLink>
                  |{' '}
                  <DeleteButtonWrapper>
                    <ProjectDelete id={projectElement.id!} />
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
      <h1>관리자 프로젝트 페이지</h1>
      {content}
      <CreateProjectLink to="/admin/project/write">
        새 프로젝트 생성
      </CreateProjectLink>
    </Container>
  );
}

export default ProjectAdminList;
