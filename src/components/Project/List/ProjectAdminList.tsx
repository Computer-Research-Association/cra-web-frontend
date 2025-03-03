import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ProjectDelete from '../Delete/ProjectAdminDelete.tsx';
import { Project } from '~/models/Project.ts';
import Pagination from '~/components/Pagination/Pagination.tsx';
import { FaHome } from 'react-icons/fa';

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

const CreateProjectLink = styled(Link)`
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

const Home = styled(Link)`
  color: black;
  margin-left: 95%;
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
    <Container>
      <h1>관리자 프로젝트 페이지</h1>
      <Home to="/admin">
        <FaHome size={30} />
      </Home>
      <BoardTable>
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
          {projects.map((project) => (
            <tr key={project.id}>
              <Td>{project.id}</Td>
              <Td>{project.semester}</Td>
              <Td>{project.teamName}</Td>
              <Td>{project.serviceName}</Td>
              <Td>{project.members.join(', ')}</Td>
              <Td>
                <ActionLink to={`/admin/project/view/${project.id}`}>
                  자세히 보기
                </ActionLink>
                |
                <ActionLink to={`/admin/project/edit/${project.id}`}>
                  수정
                </ActionLink>
                |
                <DeleteButtonWrapper>
                  <ProjectDelete id={project.id!} />
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
      <CreateProjectLink to="/admin/project/write">
        새 프로젝트 생성
      </CreateProjectLink>
    </Container>
  );
}

export default ProjectAdminList;
