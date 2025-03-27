import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { getProjects } from '~/api/project.ts';
import { ProjectPageList, Project } from '~/models/Project.ts';
import ProjectList from './List/ProjectList.tsx';
import LoadingSpinner from '../Common/LoadingSpinner.tsx';

function ProjectContainer() {
  const [currentPage, setCurrentPage] = useState(0);

  const projectsQuery = useQuery<ProjectPageList>({
    queryKey: QUERY_KEY.project.projects(currentPage),
    queryFn: async () => getProjects(currentPage),
  });

  if (projectsQuery.isLoading) return <LoadingSpinner />;
  if (projectsQuery.isError)
    return <p>Error: {projectsQuery.error?.message}</p>;

  const projects = Array.isArray(projectsQuery.data?.resListProjectDtos)
    ? projectsQuery.data.resListProjectDtos
    : [];
  const totalPage = projectsQuery.data?.totalPages || 1;

  return (
    <ProjectList
      projectsQuery={projects as Project[]}
      totalPages={totalPage}
      currentPage={currentPage}
      onPageChange={setCurrentPage}
    />
  );
}

export default ProjectContainer;
