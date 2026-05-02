import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Project } from '~/models/Project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getProjectById } from '~/api/project.ts';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

const PageWrapper = styled.div`
  width: 100%;
  max-width: 1086px;
  margin: 0 auto;
  padding: 2.5rem 1rem 6rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  box-sizing: border-box;

  @media (max-width: 1200px) {
    max-width: 886px;
  }

  @media (max-width: 1000px) {
    max-width: 756px;
  }

  @media (max-width: 768px) {
    max-width: 586px;
  }
`;

const BannerWrapper = styled.div`
  position: relative;
  border-radius: 14px;
  overflow: hidden;
`;

const Banner = styled.div<{ $imageUrl?: string }>`
  width: 100%;
  height: 380px;
  background: ${({ $imageUrl }) =>
    $imageUrl ? `url(${$imageUrl}) center/cover no-repeat` : '#f1f5f9'};
`;

const BannerImagePlaceholder = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard Regular';
  font-size: 15px;
  color: #94a3b8;
`;

const BackBtn = styled.button`
  position: absolute;
  top: 1.25rem;
  left: 1.25rem;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(6px);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #334155;
  cursor: pointer;
  z-index: 1;
  transition: background 0.15s;

  &:hover {
    background: white;
  }
`;

const ProjectInfo = styled.div`
  background: white;
  border-radius: 14px;
  border: 1px solid #e8edf3;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const SemesterBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(44, 180, 219, 0.12);
  color: #2cb4db;
  border-radius: 20px;
  font-family: 'Pretendard SemiBold';
  font-size: 13px;
  width: fit-content;
`;

const ServiceName = styled.h1`
  font-family: 'Pretendard Bold';
  font-size: 1.75rem;
  color: #1e293b;
  margin: 0;
  line-height: 1.2;
`;

const TeamName = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 15px;
  color: #64748b;
  margin: 0;
`;

const Content = styled.div`
  display: contents;
`;

const Card = styled.div`
  background: white;
  border-radius: 14px;
  border: 1px solid #e8edf3;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const CardTitle = styled.p`
  font-family: 'Pretendard SemiBold';
  font-size: 11px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #94a3b8;
  margin: 0 0 1.25rem;
`;

const FieldGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem 2rem;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FieldFull = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const FieldLabel = styled.span`
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.06em;
`;

const FieldValue = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 15px;
  color: #1e293b;
  line-height: 1.8;
`;

const LinkValue = styled.a`
  font-family: 'Pretendard Regular';
  font-size: 15px;
  color: #2cb4db;
  text-decoration: none;
  word-break: break-all;

  &:hover {
    text-decoration: underline;
  }
`;

const EmptyValue = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #94a3b8;
`;

const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const TagPill = styled.span`
  padding: 5px 14px;
  background: rgba(44, 180, 219, 0.1);
  color: #1a8fa8;
  border-radius: 20px;
  font-family: 'Pretendard Regular';
  font-size: 13px;
`;

const MemberChip = styled.span`
  padding: 5px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 20px;
  font-family: 'Pretendard Regular';
  font-size: 13px;
  color: #334155;
`;

function ProjectDetail() {
  const navigate = useNavigate();
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const projectId = Number(id);

  const projectQuery = useQuery<Project>({
    queryKey: QUERY_KEY.project.projectById(projectId),
    queryFn: async () => getProjectById(projectId),
  });

  if (projectQuery.isLoading) return <LoadingSpinner />;
  if (projectQuery.isError) return <div>에러가 발생했습니다.</div>;
  if (!projectQuery.isSuccess) return null;

  const project = projectQuery.data;

  return (
    <PageWrapper>
      <BannerWrapper>
        <Banner $imageUrl={project.imageUrl}>
          {!project.imageUrl && (
            <BannerImagePlaceholder>이미지 없음</BannerImagePlaceholder>
          )}
        </Banner>
        <BackBtn onClick={() => void navigate(-1)}>← 목록으로</BackBtn>
      </BannerWrapper>

      <ProjectInfo>
        <SemesterBadge>{project.semester}</SemesterBadge>
        <ServiceName>{project.serviceName}</ServiceName>
        <TeamName>{project.teamName}</TeamName>
      </ProjectInfo>

      <Content>
        <Card>
          <CardTitle>프로젝트 소개</CardTitle>
          <FieldFull>
            <FieldValue>{project.content}</FieldValue>
          </FieldFull>
        </Card>

        <Card>
          <CardTitle>링크</CardTitle>
          <FieldGrid>
            <Field>
              <FieldLabel>GitHub</FieldLabel>
              {project.gitHubUrl ? (
                <LinkValue
                  href={project.gitHubUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.gitHubUrl}
                </LinkValue>
              ) : (
                <EmptyValue>없음</EmptyValue>
              )}
            </Field>
            <Field>
              <FieldLabel>서비스 URL</FieldLabel>
              {project.serviceUrl ? (
                <LinkValue
                  href={project.serviceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {project.serviceUrl}
                </LinkValue>
              ) : (
                <EmptyValue>없음</EmptyValue>
              )}
            </Field>
          </FieldGrid>
        </Card>

        <Card>
          <CardTitle>팀원 & 태그</CardTitle>
          <FieldFull>
            <FieldLabel>팀원</FieldLabel>
            <PillRow>
              {project.members.length > 0 ? (
                project.members.map((member, i) => (
                  <MemberChip key={i}>{member}</MemberChip>
                ))
              ) : (
                <EmptyValue>없음</EmptyValue>
              )}
            </PillRow>
          </FieldFull>
          <FieldFull style={{ marginTop: '1.25rem' }}>
            <FieldLabel>태그</FieldLabel>
            <PillRow>
              {project.tags && project.tags.length > 0 ? (
                project.tags.map((tag) => (
                  <TagPill key={tag.id}>{tag.name}</TagPill>
                ))
              ) : (
                <EmptyValue>없음</EmptyValue>
              )}
            </PillRow>
          </FieldFull>
        </Card>
      </Content>
    </PageWrapper>
  );
}

export default ProjectDetail;
