import { useQuery } from '@tanstack/react-query';
import { Project } from '~/models/Project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getProjectById } from '~/api/project.ts';
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

function ProjectAdminDetail() {
  const currentUrl = window.location.href;

  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const projectId = Number(id);

  const projectQuery = useQuery<Project>({
    queryKey: QUERY_KEY.project.projectById(projectId),
    queryFn: async () => getProjectById(projectId),
  });

  let content;

  if (projectQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (projectQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (projectQuery.isSuccess) {
    const project = projectQuery.data;
    return (
      <Container>
        <h1>프로젝트 자세히 보기</h1>
        <Content>
          <Bold>ID:</Bold> {project.id}
        </Content>
        <Content>
          <Bold>학기:</Bold> {project.semester}
        </Content>
        <Content>
          <Bold>팀 이름:</Bold> {project.teamName}
        </Content>
        <Content>
          <Bold>서비스 이름:</Bold> {project.serviceName}
        </Content>
        <Content>
          <Bold>내용:</Bold> {project.content}
        </Content>
        <Content>
          <Bold>GitHub 주소:</Bold> {project.gitHubUrl}
        </Content>
        <Content>
          <Bold>서비스 주소:</Bold> {project.serviceUrl}
        </Content>
        <Content>
          <Bold>팀원:</Bold> {project.members.join(', ')}
        </Content>
        <Content>
          <Bold>이미지 URL:</Bold> {project.imageUrl}
        </Content>
      </Container>
    );
  }

  return <div>{content}</div>;
}

export default ProjectAdminDetail;
