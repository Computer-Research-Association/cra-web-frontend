/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { createBoards } from '~/api/board';
import { useNavigate } from 'react-router-dom';
import { useMarkdownEditor } from './Markdown.tsx';
import { Editor } from '@toast-ui/react-editor';
import styles from './BoardWrite.module.css';

interface BoardWriteProps {
  category: number;
}

export default function BoardWrite({ category }: BoardWriteProps) {
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<{ title?: string; content?: string }>(
    {},
  );
  const navigate = useNavigate();
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    category: number;
    imageUrls: string[];
  }>({
    title: '',
    content: '',
    category: category,
    imageUrls: [],
  });

  const { editorRef, editorConfig } = useMarkdownEditor({
    onContentChange: (content) => {
      setFormData((prev) => ({ ...prev, content }));
      if (content.trim()) {
        setErrors((prev) => ({ ...prev, content: undefined }));
      }
    },
  });
  const mutation = useMutation({
    mutationFn: async () => {
      const content = editorRef.current.getInstance().getMarkdown();
      const fileToUpload = file || null;

      // formData 구조를 변경하여 요청 형식에 맞게 변환
      const payload = {
        board: {
          title: formData.title,
          content,
          category: formData.category,
          imageUrls: formData.imageUrls,
          resUserDetailDto: {
            name: '사용자 이름', // 실제 사용자 정보로 변경
            email: 'user@example.com',
            studentId: 12345678,
            term: '2025-1',
            githubId: 'githubUsername',
            imgUrl: 'https://example.com/profile.jpg',
          },
        },
        file: fileToUpload ? [fileToUpload.name] : [],
      };
      console.log(payload.board);

      return await createBoards(
        { ...payload.board, likes: 0, liked: false },
        fileToUpload,
      );
    },
    onSuccess: async () => {
      alert('게시글 작성 성공');
      await navigate(-1);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100);

      setFormData({
        title: '',
        content: '',
        category: category,
        imageUrls: [],
      });
      setFile(null);
    },

    onError: (error) => {
      console.error('게시글 작성 실패:', error);
      alert('게시글 작성 실패');
    },
  });

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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>글쓰기</h2>

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
          value="게시글 작성"
        />
      </form>
    </div>
  );
}
