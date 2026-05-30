import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { Project } from '~/models/Project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getProjectById } from '~/api/project.ts';
import styled from 'styled-components';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

/* ── Layout ── */
const PageHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: 'Pretendard Bold';
  font-size: 1.75rem;
  color: #1e293b;
  margin: 0;
`;

const HeaderActions = styled.div`
  display: flex;
  gap: 8px;
`;

const BackBtn = styled.button`
  padding: 0.55rem 1.1rem;
  background: white;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #64748b;
  cursor: pointer;
  transition: background 0.12s;

  &:hover {
    background: #f8fafc;
  }
`;

const EditBtn = styled.a`
  padding: 0.55rem 1.1rem;
  background: #2cb4db;
  border-radius: 8px;
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  transition: background 0.12s;

  &:hover {
    background: #27a1c3;
  }
`;

/* ── Cards ── */
const CardStack = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
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
  line-height: 1.6;
  word-break: break-all;
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

/* ── Image Hero ── */
const HeroCard = styled(Card)`
  display: flex;
  gap: 2rem;
  align-items: flex-start;

  @media (max-width: 760px) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.img`
  width: 220px;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
  background: #f1f5f9;
`;

const ImagePlaceholder = styled.div`
  width: 220px;
  height: 150px;
  border-radius: 10px;
  border: 1px solid #e2e8f0;
  background: #f8fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard Regular';
  font-size: 13px;
  color: #94a3b8;
  flex-shrink: 0;
`;

const HeroInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const SemesterBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  background: rgba(44, 180, 219, 0.12);
  color: #2cb4db;
  border-radius: 4px;
  font-family: 'Pretendard SemiBold';
  font-size: 13px;
  width: fit-content;
`;

const HeroServiceName = styled.h2`
  font-family: 'Pretendard Bold';
  font-size: 1.4rem;
  color: #1e293b;
  margin: 0;
  line-height: 1.3;
`;

const HeroTeamName = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #64748b;
  margin: 0;
`;

const HeroId = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 12px;
  color: #94a3b8;
`;

/* ── Tags & Members ── */
const PillRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 4px;
`;

const TagPill = styled.span`
  padding: 5px 14px;
  background: rgba(44, 180, 219, 0.1);
  border: 1px solid #c9eef8;
  color: #1a8fa8;
  border-radius: 4px;
  font-family: 'Pretendard Regular';
  font-size: 13px;
`;

const MemberChip = styled.span`
  padding: 5px 14px;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-family: 'Pretendard Regular';
  font-size: 13px;
  color: #334155;
`;

const EmptyValue = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #94a3b8;
`;

function toAbsoluteUrl(url: string) {
  return /^https?:\/\//i.test(url) ? url : `https://${url}`;
}

function ProjectAdminDetail() {
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
    <div>
      <PageHeader>
        <PageTitle>프로젝트 자세히 보기</PageTitle>
        <HeaderActions>
          <BackBtn onClick={() => void navigate(-1)}>← 목록으로</BackBtn>
          <EditBtn href={`/admin/project/edit/${project.id}`}>수정</EditBtn>
        </HeaderActions>
      </PageHeader>

      <CardStack>
        {/* 히어로 카드 */}
        <HeroCard>
          {project.imageUrl ? (
            <ProjectImage src={project.imageUrl} alt={project.serviceName} />
          ) : (
            <ImagePlaceholder>이미지 없음</ImagePlaceholder>
          )}
          <HeroInfo>
            <SemesterBadge>{project.semester}</SemesterBadge>
            <HeroServiceName>{project.serviceName}</HeroServiceName>
            <HeroTeamName>{project.teamName}</HeroTeamName>
            <HeroId>ID #{project.id}</HeroId>
          </HeroInfo>
        </HeroCard>

        {/* 기본 정보 */}
        <Card>
          <CardTitle>기본 정보</CardTitle>
          <FieldGrid>
            <Field>
              <FieldLabel>학기</FieldLabel>
              <FieldValue>{project.semester}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>팀 이름</FieldLabel>
              <FieldValue>{project.teamName}</FieldValue>
            </Field>
            <Field>
              <FieldLabel>서비스 이름</FieldLabel>
              <FieldValue>{project.serviceName}</FieldValue>
            </Field>
          </FieldGrid>
        </Card>

        {/* 내용 */}
        <Card>
          <CardTitle>내용</CardTitle>
          <Field>
            <FieldValue>{project.content}</FieldValue>
          </Field>
        </Card>

        {/* 링크 */}
        <Card>
          <CardTitle>링크</CardTitle>
          <FieldGrid>
            <Field>
              <FieldLabel>GitHub</FieldLabel>
              {project.gitHubUrl ? (
                <LinkValue
                  href={toAbsoluteUrl(project.gitHubUrl)}
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
                  href={toAbsoluteUrl(project.serviceUrl)}
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

        {/* 팀원 & 태그 */}
        <Card>
          <CardTitle>팀원 & 태그</CardTitle>
          <Field>
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
          </Field>
          <Field style={{ marginTop: '1.25rem' }}>
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
          </Field>
        </Card>
      </CardStack>
    </div>
  );
}

export default ProjectAdminDetail;
