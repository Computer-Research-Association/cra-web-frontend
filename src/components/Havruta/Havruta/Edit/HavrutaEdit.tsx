import React, { useEffect, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { getHavrutaById, updateHavruta } from '~/api/havruta/havruta';
import { Havruta } from '~/models/Havruta';
import styled from 'styled-components';
import { QUERY_KEY } from '~/api/queryKey';
import LoadingSpinner from '~/components/Common/LoadingSpinner';

const Container = styled.div`
  padding: 10rem;
`;

function HavrutaEdit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    className: '',
    professor: '',
  });
  const currentUrl = window.location.href;
  const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
  const havrutaId = Number(id);

  const havrutaQuery = useQuery<Havruta>({
    queryKey: QUERY_KEY.havruta.havrutaById(havrutaId),
    queryFn: async () => getHavrutaById(havrutaId),
  });

  let content;

  const mutation = useMutation({
    mutationFn: (newHavruta: Havruta) => updateHavruta(newHavruta),
    onSuccess: async () => {
      await navigate(-1);
    },
    onError: (error) => {
      console.error('하브루타 수정 실패: ', error);
    },
  });

  useEffect(() => {
    if (havrutaQuery.isSuccess && havrutaQuery.data) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        ...havrutaQuery.data,
      }));
    }
  }, [havrutaQuery.isSuccess, havrutaQuery.data]);

  const HandleChange = (
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

  if (havrutaQuery.isLoading) {
    content = <LoadingSpinner />;
  } else if (havrutaQuery.isError) {
    content = <div>에러가 발생했습니다!!</div>;
  } else if (havrutaQuery.isSuccess) {
    return (
      <Container>
        <form onSubmit={HandleSubmit}>
          <h1>하브루타 수정</h1>

          <label htmlFor="className">과목명</label>
          <input
            type="text"
            id="className"
            name="className"
            value={formData.className}
            onChange={HandleChange}
            required
          />

          <label htmlFor="professor">교수명</label>
          <input
            type="text"
            id="professor"
            name="professor"
            value={formData.professor}
            onChange={HandleChange}
            required
          />
          <input type="submit" value="하브루타 수정"></input>
        </form>
      </Container>
    );
  }

  return <div>{content}</div>;
}

export default HavrutaEdit;
