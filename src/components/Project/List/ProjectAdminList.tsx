import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProjectDelete from '../Delete/ProjectAdminDelete.tsx';
import { Project } from '~/models/Project.ts';
import Pagination from '~/components/Pagination/Pagination.tsx';

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

const CreateBtn = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.6rem 1.2rem;
  background: #2cb4db;
  color: white;
  border-radius: 8px;
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  text-decoration: none;
  transition: background 0.15s;

  &:hover {
    background: #27a1c3;
  }

  &::before {
    content: '+';
    font-size: 18px;
    line-height: 1;
  }
`;

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 2.5rem;
`;

const Row = styled(Link)`
  display: flex;
  align-items: center;
  background: white;
  border-radius: 10px;
  border: 1px solid #e8edf3;
  padding: 1rem 1.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  gap: 1.5rem;
  transition: box-shadow 0.12s;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.09);
  }
`;

const IdBadge = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 12px;
  color: #94a3b8;
  width: 40px;
  flex-shrink: 0;
`;

const SemesterBadge = styled.span`
  padding: 3px 10px;
  background: rgba(44, 180, 219, 0.12);
  color: #2cb4db;
  border-radius: 4px;
  font-family: 'Pretendard SemiBold';
  font-size: 12px;
  flex-shrink: 0;
`;

const ServiceName = styled.span`
  font-family: 'Pretendard SemiBold';
  font-size: 15px;
  color: #1e293b;
  flex: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TeamName = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: #64748b;
  width: 140px;
  flex-shrink: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
  margin-left: auto;
`;

const ActionLink = styled(Link)`
  padding: 5px 12px;
  border-radius: 6px;
  font-family: 'Pretendard Regular';
  font-size: 13px;
  text-decoration: none;
  transition: background 0.12s;
`;

const EditLink = styled(ActionLink)`
  color: #64748b;
  &:hover {
    background: #f1f5f9;
  }
`;

const PaginationWrapper = styled.div`
  padding-bottom: 2rem;
`;

interface ProjectListProps {
  projects: Project[];
  totalPages: number;
  currentPage: number;
  onPageChange: (_page: number) => void;
}

function ProjectAdminList({
  projects,
  totalPages,
  currentPage,
  onPageChange,
}: ProjectListProps) {
  return (
    <div>
      <PageHeader>
        <PageTitle>프로젝트 관리</PageTitle>
        <CreateBtn to="/admin/project/write">새 프로젝트 생성</CreateBtn>
      </PageHeader>

      <List>
        {projects.map((project) => (
          <Row key={project.id} to={`/admin/project/view/${project.id}`}>
            <IdBadge>#{project.id}</IdBadge>
            <SemesterBadge>{project.semester}</SemesterBadge>
            <ServiceName>{project.serviceName}</ServiceName>
            <TeamName>{project.teamName}</TeamName>
            <Actions onClick={(e) => e.preventDefault()}>
              <EditLink to={`/admin/project/edit/${project.id}`}>수정</EditLink>
              <ProjectDelete id={project.id!} />
            </Actions>
          </Row>
        ))}
      </List>

      <PaginationWrapper>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      </PaginationWrapper>
    </div>
  );
}

export default ProjectAdminList;
