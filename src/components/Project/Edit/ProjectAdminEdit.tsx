import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getProjectById, updateProject } from '~/api/project.ts';
import { QUERY_KEY } from '~/api/queryKey.ts';
import { onUploadImage } from '~/api/board.ts';
import { Project } from '~/models/Project.ts';
import styles from '../Project.module.css';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

function ProjectAdminEdit() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    semester: '',
    teamName: '',
    serviceName: '',
    content: '',
    gitHubUrl: '',
    serviceUrl: '',
    members: [''],
    imageUrl: '',
  });
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const projectId = Number(id);

  const projectQuery = useQuery<Project>({
    queryKey: QUERY_KEY.project.projectById(projectId),
    queryFn: async () => getProjectById(projectId),
  });

  let content;

  const mutation = useMutation({
    mutationFn: (newProject: Project) => updateProject(newProject),
    onSuccess: async () => {
      await navigate(-1);
    },
    onError: (error) => {
      console.error('프로젝트 수정 실패:', error);
    },
  });

  useEffect(() => {
    if (projectQuery.isSuccess && projectQuery.data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...projectQuery.data,
      }));
    }
  }, [projectQuery.isSuccess, projectQuery.data]);

  const handleChange = async (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, files } = e.target as HTMLInputElement;

    if (files && files[0]) {
      const file = files[0];
      const imageUrl = await onUploadImage(file); // 이미지 업로드 함수 호출

      if (imageUrl) {
        setFormData((formData) => ({ ...formData, imageUrl })); // URL을 formData에 저장
      }
    } else {
      setFormData((formData) => ({
        ...formData,
        [name]: name === 'members' ? value.split(',') : value, // 텍스트 데이터 업데이트
      }));
    }
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (projectQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (projectQuery.isError) {
    content = <div className="error">에러가 발생했습니다!</div>;
  } else if (projectQuery.isSuccess) {
    return (
      <div className={styles['container']}>
        <form onSubmit={HandleSubmit}>
          <h1>프로젝트 게시글 수정</h1>

          <label htmlFor="semester">학기</label>
          <input
            type="text"
            id="semester"
            name="semester"
            placeholder="진행된 학기를 입력하세요 (예: 24-2)"
            value={formData.semester}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="teamName">팀 이름</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            placeholder="팀 이름을 입력하세요"
            value={formData.teamName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="title">서비스 이름</label>
          <input
            type="text"
            id="serviceName"
            name="serviceName"
            placeholder="서비스 이름을 입력하세요"
            value={formData.serviceName}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="content">내용</label>
          <input
            type="text"
            id="content"
            name="content"
            placeholder="내용을 입력하세요"
            value={formData.content}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="gitHubUrl">GitHub 주소</label>
          <input
            type="text"
            id="gitHubUrl"
            name="gitHubUrl"
            placeholder="깃허브 주소를 입력하세요"
            value={formData.gitHubUrl}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="serviceUrl">서비스 URL</label>
          <input
            type="text"
            id="serviceUrl"
            name="serviceUrl"
            placeholder="서비스 주소를 입력하세요"
            value={formData.serviceUrl}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="members">팀원</label>
          <input
            type="text"
            id="members"
            name="members"
            placeholder="팀원들의 이름을 입력하세요"
            value={formData.members.join(',')}
            onChange={handleChange}
            required
          />
          <br />
          <label htmlFor="imageSelect">이미지 선택</label>
          <input
            type="file"
            id="imageSelect"
            name="imageSelect"
            accept="image/*"
            onChange={handleChange}
          />
          <br />
          <input type="submit" value="프로젝트 수정" />
        </form>
      </div>
    );
  }

  return <div>{content}</div>;
}

export default ProjectAdminEdit;
