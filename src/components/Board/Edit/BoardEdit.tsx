/* eslint-disable */
// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { CATEGORY_STRINGS } from '~/constants/category_strings';
import { getBoardById, updateBoards } from '~/api/board';
import { QUERY_KEY } from '~/api/queryKey';
import { useMarkdownEditor } from '../Write/Markdown';
import { Editor } from '@toast-ui/react-editor';
import styles from './BoardEdit.module.css';

interface BoardEditProps {
  category: number;
}

export default function BoardEdit({ category }: BoardEditProps) {
  const navigate = useNavigate();
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {},
  );
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: number;
    imageUrls: string[];
    fileUrl?: string;
  }>({
    title: '',
    content: '',
    category: category,
    imageUrls: [],
    fileUrl: '',
  });

  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const boardId = Number(id);

  const { editorRef, editorConfig } = useMarkdownEditor({
    onContentChange: (content) => {
      setFormData((prev) => ({ ...prev, content }));
      if (content.trim()) {
        setErrors((prev) => ({ ...prev, content: undefined }));
      }
    },
  });

  const boardQuery = useQuery({
    queryKey: QUERY_KEY.board.boardById(boardId),
    queryFn: () => getBoardById(boardId),
    enabled: !!boardId,
  });

  useEffect(() => {
    if (boardQuery.data && editorRef.current) {
      const board = boardQuery.data;
      setFormData({
        title: board.title || '',
        content: board.content || '',
        category: board.category,
        imageUrls: board.imageUrls || [],
        fileUrl: board.fileUrl || '',
      });

      editorRef.current.getInstance().setMarkdown(board.content || '');
    }
  }, [boardQuery.data, editorRef.current]);

  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      const fileToUpload = file || null;

      const payload = {
        board: {
          title: formData.title,
          content,
          imageUrls: formData.imageUrls,
          isChangedFile: !!fileToUpload,
          deleted: false,
        },
        file: fileToUpload ? fileToUpload.name : null,
      };

      return await updateBoards(payload.board, fileToUpload);
    },
    onSuccess: async () => {
      await navigate(-1);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);
    },
    onError: (error) => {
      console.error('게시글 수정 실패:', error);
    },
  });

  const extractFileName = (fileUrl: string) => {
    const decodedUrl = decodeURIComponent(fileUrl);
    const match = decodedUrl.match(/[^/]+\/[^/]+\/[a-f0-9-]+_(.+)/);
    return match ? match[1] : decodedUrl.split('/').pop() || '파일';
  };

  const validateForm = () => {
    const newErrors: { title?: string; content?: string } = {};
    let isValid = true;

    if (!formData.title.trim()) {
      newErrors.title = '제목을 입력해주세요.';
      isValid = false;
    }

    const content = editorRef.current?.getInstance().getMarkdown() || '';
    if (!content.trim()) {
      newErrors.content = '내용을 입력해주세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'imageUrls' ? value.split(',') : value,
    }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    mutation.mutate();
  };

  // 로딩 상태 처리
  if (boardQuery.isLoading || boardQuery.isLoading) {
    return <LoadingSpinner />;
  }

  if (boardQuery.isError || boardQuery.isError) {
    return <div>에러가 발생했습니다!!</div>;
  }

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>
          {CATEGORY_STRINGS[category]} 게시글 수정
        </h2>

        <label htmlFor="title">제목</label>
        <input
          className={`${styles['input-title']} ${errors.title ? styles['input-error'] : ''}`}
          type="text"
          id="title"
          name="title"
          placeholder="제목을 입력하세요."
          value={formData.title}
          onChange={handleChange}
        />
        {errors.title && (
          <p className={styles['error-message']}>{errors.title}</p>
        )}

        <label htmlFor="content">내용</label>
        <div
          className={`${styles['editor-container']} ${errors.content ? styles['editor-error-container'] : ''}`}
        >
          <Editor ref={editorRef} {...editorConfig} />
        </div>
        {errors.content && (
          <p className={styles['error-message']}>{errors.content}</p>
        )}

        <label className={styles['file-button']} htmlFor="fileUpload">
          파일 선택
        </label>
        <input
          className={styles['file-input']}
          type="file"
          id="fileUpload"
          onChange={handleFileChange}
        />
        {/* 기존 파일이 있는 경우 표시 */}
        {formData.fileUrl && !file && (
          <div className={styles['file-item']}>
            {extractFileName(formData.fileUrl)}
            <button
              type="button"
              className={styles['remove-button']}
              onClick={() => setFormData((prev) => ({ ...prev, fileUrl: '' }))}
            >
              ✕
            </button>
          </div>
        )}
        {/* 새로 선택한 파일이 있는 경우 표시 */}
        {file && (
          <div className={styles['file-item']}>
            {file.name}
            <button
              type="button"
              className={styles['remove-button']}
              onClick={handleRemoveFile}
            >
              ✕
            </button>
          </div>
        )}
        <div className={styles['file-comment']}>
          파일 업로드는 한 개만 가능합니다!
        </div>
        <input
          className={styles['submit-button']}
          type="submit"
          value="게시물 수정"
        />
      </form>
    </div>
  );
}
