import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createHavrutaAdmin } from '~/api/havruta';
import { Havruta } from '~/models/Havruta';
import styles from './HavrutaAdminWrite.module.css';

function HavrutaAdminWrite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    className: '',
    professor: '',
  });

  const mutation = useMutation({
    mutationFn: (newHavrutaContent: Havruta) =>
      createHavrutaAdmin(newHavrutaContent),
    onSuccess: async () => {
      await alert('하브루타 목록 작성 성공');
      navigate(-1);
      setFormData({
        className: '',
        professor: '',
      });
    },
    onError: (error) => {
      console.error('하브루타 목록 작성 실패:', error);
      alert('하브루타 목록 작성 실패');
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ['members', 'imageUrls'].includes(name)
        ? value.split(',')
        : value,
    });
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Sending Data:', formData);
    mutation.mutate(formData);
  };

  return (
    <div className={styles['container']}>
      <form onSubmit={HandleSubmit}>
        <h2>Havruta 목록 작성</h2>
        <br />
        <label htmlFor="className">과목명</label>
        <input
          type="text"
          id="className"
          name="className"
          placeholder="과목명을 입력하세요"
          value={formData.className}
          onChange={handleChange}
          required
        />

        <br />
        <label htmlFor="professor">교수명</label>
        <input
          type="text"
          id="professor"
          name="professor"
          placeholder="교수명을 입력하세요"
          value={formData.professor}
          onChange={handleChange}
          required
        />

        <input type="submit" value="게시글 작성" />
      </form>
    </div>
  );
}

export default HavrutaAdminWrite;
