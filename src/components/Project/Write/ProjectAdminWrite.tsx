import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createProjects } from '~/api/project.ts';
import { Project } from '~/models/Project';
import { onUploadImage } from '~/api/board.ts';
import styles from '../Project.module.css';

function ProjectAdminWrite() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [tagInput, setTagInput] = useState('');
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    semester: '',
    teamName: '',
    serviceName: '',
    content: '',
    gitHubUrl: '',
    serviceUrl: '',
    members: [''],
    tagNames: [] as string[],
    imageUrl: '',
  });

  const mutation = useMutation({
    mutationFn: (newProject: Project) => createProjects(newProject),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['project.projects'] });
      alert('프로젝트가 성공적으로 생성됐습니다.');
      await navigate(-1);
    },
    onError: (error: unknown) => {
      console.error('프로젝트 작성 실패:', error);
    },
  });

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const file = files[0];
      setUploadProgress(0);
      const imageUrl = await onUploadImage(file, setUploadProgress);
      if (imageUrl) {
        setFormData((prev) => ({ ...prev, imageUrl }));
        setUploadProgress(100);
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]:
          name === 'members'
            ? value.split(',').map((m) => m.trimStart())
            : value,
      }));
    }
  };

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !formData.tagNames.includes(trimmed)) {
        setFormData((prev) => ({
          ...prev,
          tagNames: [...prev.tagNames, trimmed],
        }));
      }
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tagNames: prev.tagNames.filter((t) => t !== tag),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.imageUrl) {
      alert('이미지 업로드가 완료되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }
    mutation.mutate(formData);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.formTitle}>프로젝트 생성</h2>
      <form className={styles.form} onSubmit={handleSubmit}>
        {/* 기본 정보 */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>기본 정보</p>
          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="semester">
                학기
              </label>
              <input
                className={styles.input}
                type="text"
                id="semester"
                name="semester"
                placeholder="예: 24-2"
                value={formData.semester}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="teamName">
                팀 이름
              </label>
              <input
                className={styles.input}
                type="text"
                id="teamName"
                name="teamName"
                placeholder="팀 이름을 입력하세요"
                value={formData.teamName}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="serviceName">
              서비스 이름
            </label>
            <input
              className={styles.input}
              type="text"
              id="serviceName"
              name="serviceName"
              placeholder="서비스 이름을 입력하세요"
              value={formData.serviceName}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="content">
              내용
            </label>
            <input
              className={styles.input}
              type="text"
              id="content"
              name="content"
              placeholder="프로젝트 내용을 입력하세요"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* 링크 */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>링크</p>
          <div className={styles.fieldRow}>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="gitHubUrl">
                GitHub 주소
              </label>
              <input
                className={styles.input}
                type="text"
                id="gitHubUrl"
                name="gitHubUrl"
                placeholder="https://github.com/..."
                value={formData.gitHubUrl}
                onChange={handleChange}
                required
              />
            </div>
            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="serviceUrl">
                서비스 URL
              </label>
              <input
                className={styles.input}
                type="text"
                id="serviceUrl"
                name="serviceUrl"
                placeholder="https://..."
                value={formData.serviceUrl}
                onChange={handleChange}
                required
              />
            </div>
          </div>
        </div>

        {/* 팀원 & 태그 */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>팀원 & 태그</p>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="members">
              팀원
            </label>
            <input
              className={styles.input}
              type="text"
              id="members"
              name="members"
              placeholder="쉼표로 구분해서 입력하세요 (예: 홍길동, 김철수)"
              value={formData.members.join(',')}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.fieldGroup}>
            <label className={styles.label} htmlFor="tagInput">
              태그
            </label>
            <input
              className={styles.input}
              type="text"
              id="tagInput"
              placeholder="태그 입력 후 Enter (예: React, Java)"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagKeyDown}
            />
            {formData.tagNames.length > 0 && (
              <div className={styles.tagList}>
                {formData.tagNames.map((tag) => (
                  <span key={tag} className={styles.tagPill}>
                    {tag}
                    <button
                      type="button"
                      className={styles.tagRemoveBtn}
                      onClick={() => removeTag(tag)}
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* 이미지 */}
        <div className={styles.card}>
          <p className={styles.cardTitle}>이미지</p>
          <div className={styles.fieldGroup}>
            <label className={styles.label}>대표 이미지</label>
            <div className={styles.fileInputWrapper}>
              <span className={styles.fileInputLabel}>
                클릭하여 이미지를 선택하세요
              </span>
              <input
                className={styles.fileInput}
                type="file"
                id="imageUrl"
                name="imageUrl"
                accept="image/*"
                onChange={handleChange}
                required
              />
            </div>
            {uploadProgress !== null && !formData.imageUrl && (
              <div className={styles.progressWrapper}>
                <div
                  className={styles.progressBar}
                  style={{ width: `${uploadProgress}%` }}
                />
                <span className={styles.progressText}>{uploadProgress}%</span>
              </div>
            )}
            {formData.imageUrl && (
              <p className={styles.uploadSuccess}>이미지 업로드 완료</p>
            )}
          </div>
        </div>

        {mutation.isError && (
          <p style={{ color: 'red', fontSize: '14px' }}>
            오류:{' '}
            {mutation.error instanceof Error
              ? mutation.error.message
              : String(mutation.error)}
          </p>
        )}
        <button
          type="submit"
          className={styles.submitBtn}
          disabled={mutation.isPending}
        >
          {mutation.isPending ? '업로드 중...' : '게시글 작성'}
        </button>
      </form>
    </div>
  );
}

export default ProjectAdminWrite;
