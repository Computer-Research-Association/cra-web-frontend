import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createProjects } from '~/api/project.ts';
import { Project } from '~/models/Project';
import { onUploadImage } from '~/api/board.ts';
import styles from '../Project.module.css';

function ProjectAdminWrite() {
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

  const mutation = useMutation({
    mutationFn: (newProject: Project) => createProjects(newProject),
    onSuccess: async () => {
      await navigate(-1);
      setFormData({
        semester: '',
        teamName: '',
        serviceName: '',
        content: '',
        gitHubUrl: '',
        serviceUrl: '',
        members: [''],
        imageUrl: '',
      });
    },
    onError: (error) => {
      console.error('프로젝트 작성 실패:', error);
    },
  });

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
    console.log('Sending Data:', formData);
    mutation.mutate(formData);
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={HandleSubmit}>
        <h2>프로젝트 게시글 작성</h2>

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
        <input type="submit" value="게시글 작성" />
      </form>
    </div>
  );
}

export default ProjectAdminWrite;
