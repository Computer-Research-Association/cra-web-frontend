/* eslint-disable */
// @ts-nocheck

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { deleteBoards, deleteTag, getBoardsByCategory } from '~/api/board.ts';
import { getProjects } from '~/api/project.ts';
import { CATEGORY } from '~/constants/category.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { BoardTag } from '~/models/Board.ts';
import { MdDeleteOutline } from 'react-icons/md';
import styles from './BoardDelete.module.css';

export default function BoardDelete({
  id,
  category,
  tags,
}: {
  id: number;
  category: number;
  tags?: BoardTag[];
}) {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      if (tags && tags.length > 0) {
        // 프로젝트 전체를 API로 직접 조회해 사용 중인 태그 이름 수집
        const firstPage = await getProjects(1, 1000);
        const totalPages = firstPage.totalPages ?? 1;

        const allProjects = Array.isArray(firstPage.resListProjectDtos)
          ? (firstPage.resListProjectDtos as any[])
          : [];

        if (totalPages > 1) {
          const remainingPages = await Promise.all(
            Array.from({ length: totalPages - 1 }, (_, i) =>
              getProjects(i + 2, 1000),
            ),
          );
          remainingPages.forEach((page) => {
            if (Array.isArray(page.resListProjectDtos)) {
              allProjects.push(...(page.resListProjectDtos as any[]));
            }
          });
        }

        const projectTagIds = new Set<number>();
        allProjects.forEach((project) => {
          project.tags?.forEach((tag: { id: number }) =>
            projectTagIds.add(tag.id),
          );
        });

        // 다른 게시글에서 사용 중인 태그 ID 수집 (현재 삭제할 게시글 제외)
        const firstBoardPage = await getBoardsByCategory(CATEGORY.ACADEMIC, 1, 1000);
        const totalBoardPages = firstBoardPage.totalPages ?? 1;
        const allBoards = [...(firstBoardPage.resListBoardDtos ?? [])];
        if (totalBoardPages > 1) {
          const remainingBoardPages = await Promise.all(
            Array.from({ length: totalBoardPages - 1 }, (_, i) =>
              getBoardsByCategory(CATEGORY.ACADEMIC, i + 2, 1000),
            ),
          );
          remainingBoardPages.forEach((page) => {
            allBoards.push(...(page.resListBoardDtos ?? []));
          });
        }
        const otherBoardTagIds = new Set<number>();
        allBoards
          .filter((board) => board.id !== id)
          .forEach((board) => board.tags?.forEach((tag) => otherBoardTagIds.add(tag.id)));

        // 프로젝트와 다른 게시글 어디서도 사용 중이지 않은 태그만 삭제
        const tagsToDelete = tags.filter(
          (tag) => !projectTagIds.has(tag.id) && !otherBoardTagIds.has(tag.id),
        );
        await Promise.all(tagsToDelete.map((tag) => deleteTag(tag.id)));
      }
      return deleteBoards(id);
    },
    onSuccess: async () => {
      await navigate(-1);
      // 게시글 목록 캐시 무효화
      await queryClient.invalidateQueries({
        queryKey: QUERY_KEY.board.boardsCount(category),
      });
      await queryClient.refetchQueries({
        queryKey: QUERY_KEY.board.boardsCount(category),
      });
    },
    onError: (error) => {
      console.error('게시글 삭제 실패:', error);
    },
  });

  const handleDelete = () => {
    const confirmDelete = window.confirm('정말로 삭제하시겠습니까?');
    if (confirmDelete) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className={styles['delete-button']} onClick={handleDelete}>
      <MdDeleteOutline size={24} />
    </div>
  );
}
