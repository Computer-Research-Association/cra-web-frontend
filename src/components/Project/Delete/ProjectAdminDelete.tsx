import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '~/api/project.ts';
import styled from 'styled-components';

const DeleteButton = styled.button`
  background: none;
  border: none;
  color: var(--color-delete);
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
      await queryClient.invalidateQueries({ queryKey: ['project.projects'] });
      alert('프로젝트가 성공적으로 삭제됐습니다.');
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
