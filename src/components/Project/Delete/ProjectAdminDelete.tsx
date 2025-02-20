import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '~/api/project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { Project } from '~/models/Project.ts';
import styled from 'styled-components';

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: #da2b2b;
  cursor: pointer;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

function ProjectAdminDelete({ id }: { id: number }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: number) => deleteProject(id),
    onSuccess: async () => {
      queryClient.setQueryData<Project[]>(
        QUERY_KEY.project.projects(),
        (oldData) => {
          if (!oldData) return [];
          return oldData.filter((project) => project.id !== id);
        },
      );

      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.project.projects(),
      });
    },
    onError: (error) => {
      console.error('프로젝트 삭제 실패', error);
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
  };

  return <DeleteButton onClick={handleDelete}>삭제</DeleteButton>;
}

export default ProjectAdminDelete;
