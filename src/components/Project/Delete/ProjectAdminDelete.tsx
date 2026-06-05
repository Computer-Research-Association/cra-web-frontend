import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject } from '~/api/project.ts';
import { deleteTag, getBoardsByCategory } from '~/api/board.ts';
import { ProjectTag } from '~/models/Project.ts';
import { CATEGORY } from '~/constants/category.ts';
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

function ProjectAdminDelete({ id, tags }: { id: number; tags?: ProjectTag[] }) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (id: number) => {
      if (tags && tags.length > 0) {
        // 아카데믹 게시글 전체를 API로 직접 조회해 사용 중인 태그 ID 수집
        const firstPage = await getBoardsByCategory(CATEGORY.ACADEMIC, 1, 1000);
        const totalPages = firstPage.totalPages ?? 1;

        const allBoards = [...(firstPage.resListBoardDtos ?? [])];

        if (totalPages > 1) {
          const remainingPages = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) =>
              getBoardsByCategory(CATEGORY.ACADEMIC, i + 2, 1000),
            ),
          );
          remainingPages.forEach((page) => {
            allBoards.push(...(page.resListBoardDtos ?? []));
          });
        }

        const academicTagIds = new Set<number>();
        allBoards.forEach((board) => {
          board.tags?.forEach((tag) => academicTagIds.add(tag.id));
        });

        // 아카데믹 게시글에서 사용 중이지 않은 태그만 삭제
        const tagsToDelete = tags.filter((tag) => !academicTagIds.has(tag.id));
        await Promise.all(tagsToDelete.map((tag) => deleteTag(tag.id)));
      }
      return deleteProject(id);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project.projects'] });
      alert('프로젝트가 성공적으로 삭제됐습니다.');
    },
    onError: (error) => {
      console.error('프로젝트 삭제 실패', error);
    },
  });

  return <DeleteButton onClick={() => mutation.mutate(id)}>삭제</DeleteButton>;
}

export default ProjectAdminDelete;
