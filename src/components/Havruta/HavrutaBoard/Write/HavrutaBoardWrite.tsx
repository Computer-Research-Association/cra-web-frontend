import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBoards } from '~/api/board.ts';
import { getAllHavrutas } from '~/api/havruta/havruta.ts';
import { Havruta } from '~/models/Havruta.ts';
import { CATEGORY } from '~/constants/category.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import styles from './HavrutaBoardWrite.module.css';
import { useMarkdownEditor } from '../../../Board/Write/Markdown';
import { Editor } from '@toast-ui/react-editor';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

export default function HavrutaBoardWrite() {
  const havrutaCategory = CATEGORY.HAVRUTA;
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
    havrutaDto: {
      id: number | null;
      classname: string;
      professor: string;
    };
  }>({
    title: '',
    content: '',
    category: havrutaCategory,
    imageUrls: [],
    havrutaDto: {
      id: null,
      classname: '',
      professor: '',
    },
  });

  const { editorRef, editorConfig } = useMarkdownEditor({
    onContentChange: (content) => {
      setFormData((prev) => ({ ...prev, content }));
      if (content.trim()) {
        setErrors((prev) => ({ ...prev, content: undefined }));
      }
    },
  });

  const havrutaQuery = useQuery<Havruta[]>({
    queryKey: QUERY_KEY.havruta.havrutas(),
    queryFn: async () => getAllHavrutas(),
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
          havrutaDto: formData.havrutaDto,
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
      await navigate(-1);
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 100); // 화면 위로 끌어올리기

      setFormData({
        title: '',
        content: '',
        category: havrutaCategory,
        imageUrls: [],
        havrutaDto: {
          id: null,
          classname: '',
          professor: '',
        },
      });
      setFile(null);
    },

    onError: (error) => {
      console.error('게시글 작성 실패:', error);
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

  const handleSelectHavruta = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedHavrutaId = parseInt(e.target.value, 10);
    const selectedHavruta = havrutaQuery.data?.find(
      (h) => h.id === selectedHavrutaId,
    );

    if (!selectedHavruta) {
      console.error('선택한 하브루타 과목을 찾을 수 없습니다.');
      return;
    }

    console.log(
      '선택한 과목:',
      selectedHavruta?.className,
      selectedHavruta?.professor,
    ); // 추가

    setFormData((prev) => ({
      ...prev,
      havrutaDto: {
        id: selectedHavruta.id ?? null,
        classname: selectedHavruta.className || '', // 🔹 빈 문자열로 기본값 설정
        professor: selectedHavruta.professor || '', // 🔹 빈 문자열로 기본값 설정
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    mutation.mutate();
  };

  return (
    <div className={styles['write-container']}>
      <form className={styles['write-form']} onSubmit={handleSubmit}>
        <h2 className={styles['write-title']}>하브루타 게시글 작성</h2>
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

        <label htmlFor="havrutaId">과목명</label>
        {havrutaQuery.isLoading ? (
          <LoadingSpinner />
        ) : havrutaQuery.isError ? (
          <p>과목 목록을 불러오는데 실패했습니다.</p>
        ) : havrutaQuery.data?.length === 0 ? (
          <p>사용 가능한 과목이 없습니다.</p>
        ) : (
          <select
            id="havrutaId"
            name="havrutaId"
            value={formData.havrutaDto.id || ''}
            onChange={handleSelectHavruta}
            required
          >
            <option value="" disabled>
              하브루타 과목을 선택하세요
            </option>
            {havrutaQuery.data?.map((havruta) => (
              <option key={havruta.id} value={havruta.id}>
                {havruta.className} ({havruta.professor})
              </option>
            ))}
          </select>
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
          value="하브루타 작성"
        />
      </form>
    </div>
  );
}
