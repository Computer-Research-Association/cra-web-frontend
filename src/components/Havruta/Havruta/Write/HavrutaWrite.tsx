import React, { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createHavruta } from '~/api/havruta/havruta';
import { Havruta } from '~/models/Havruta';
import styled from 'styled-components';

const Container = styled.div`
  padding: 10rem;
`;

function HavrutaWrite() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    className: '',
    professor: '',
  });

  const mutation = useMutation({
    mutationFn: (newHavrutaContent: Havruta) =>
      createHavruta(newHavrutaContent),
    onSuccess: async () => {
      await navigate(-1);
      setFormData({
        className: '',
        professor: '',
      });
    },
    onError: (error) => {
      console.error('하브루타 목록 작성 실패:', error);
    },
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const HandleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <Container>
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
    </Container>
  );
}

export default HavrutaWrite;
