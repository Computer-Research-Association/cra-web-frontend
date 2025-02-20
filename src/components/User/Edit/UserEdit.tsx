import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { User } from '~/models/User';
import { updateUser } from '~/api/user';
import { useUserStore } from '~/store/userStore';
import styles from '../UserPage.module.css';

function UserEdit() {
  const navigate = useNavigate();

  // zustand로 상태관리 되고 있는 현재 유저 정보 가져오기
  const { name, email, studentId, term, githubId, setUser } = useUserStore();

  // 폼에 저장될 데이터 정의하기
  const [formData, setFormData] = useState<User>({
    name,
    email,
    studentId,
    term,
    githubId,
  });

  // Update Query 실행
  const mutation = useMutation({
    // 데이터 서버로 보내기
    mutationFn: async (updatedUser: User) => {
      await updateUser(updatedUser);
      return updatedUser;
    },
    onSuccess: (data) => {
      // 성공하면 마이페이지로 이동
      void navigate(`/user/${data.name}`);
      setUser(data);
    },
    onError: () => {
      // 테스트용
      console.log('유저 정보 수정 실패');
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <div className={styles.title}>유저 정보 수정</div>

        <label htmlFor="name">이름</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">이메일</label>
        <input
          type="text"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="studentId">학번</label>
        <input
          type="number"
          id="studentId"
          name="studentId"
          value={formData.studentId}
          onChange={handleChange}
          required
        />

        <label htmlFor="term">기수</label>
        <input
          type="text"
          id="term"
          name="term"
          value={formData.term}
          onChange={handleChange}
          required
        />

        <label htmlFor="githubId">GihHub 아이디</label>
        <input
          type="text"
          id="githubId"
          name="githubId"
          value={formData.githubId}
          onChange={handleChange}
          required
        />
        <input
          type="submit"
          value="수정 확인"
          className={`${styles.submit} ${styles.formbutton}`}
        ></input>
      </form>
    </div>
  );
}

export default UserEdit;
