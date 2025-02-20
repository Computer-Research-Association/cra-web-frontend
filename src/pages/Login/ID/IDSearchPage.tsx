import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { findId } from '~/api/account';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 5rem 0;
`;

const Title = styled.h2`
  line-height: 59px;
  color: var(--color-bright-text);
  font-size: 40px;
  text-align: center;
  margin-bottom: 70px;
`;

const Form = styled.form`
  width: 100%;
  max-width: 700px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 3rem 10rem;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
`;

const Label = styled.label`
  color: var(--color-dark);
  font-family: 'Pretendard SemiBold';
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  user-select: none;
`;

const StyledInput = styled.input<{ hasError: boolean }>`
  width: 100%;
  background-color: var(--color-white);
  color: black;
  border: 1px solid
    ${({ hasError }) => (hasError ? 'red' : 'var(--color-dark-stroke)')};
  border-radius: 0.5rem;
  padding: 1.5rem 1rem;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease-in-out;

  &:focus {
    border: 1px solid black; /* 기본 border 유지 */
    box-shadow: 0 0 0 1px black; /* 검정색 테두리를 확실하게 적용 */
  }
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
`;

const Submit = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  background-color: var(--color-primary);
  color: var(--color-white);
  font-size: 1.5rem;
  font-family: 'Pretendard Bold';
  border-radius: 1rem;
  border: none;
  padding: 1rem 0;
  margin: 4rem 0 2rem 0;
  user-select: none;
  cursor: pointer;
`;

function IDSearchPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    name: '',
    email: '',
  });

  const [errors, setErrors] = useState({
    studentId: '',
    name: '',
    email: '',
  });

  const validate = () => {
    const newErrors = { studentId: '', name: '', email: '' };
    let isValid = true;

    if (!formData.studentId) {
      newErrors.studentId = '학번을 입력하세요.';
      isValid = false;
    }

    if (!formData.name) {
      newErrors.name = '이름을 입력하세요.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = '이메일을 입력하세요.';
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = '유효한 이메일 주소를 입력하세요.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // 입력하면 즉시 오류 제거
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      console.log('Request Data:', formData);
      const username = await findId(formData);
      console.log('API Response:', username);

      if (!username) throw new Error('응답에서 username을 찾을 수 없습니다.');

      await navigate(`/idsearch/complete?id=${username}`);
    } catch (error: unknown) {
      console.error('API Error:', error);
      if (error instanceof Error) {
        setErrors((prev) => ({ ...prev, studentId: error.message }));
      } else {
        setErrors((prev) => ({ ...prev, studentId: '오류가 발생했습니다.' }));
      }
    }
  };

  return (
    <Container>
      <Title>아이디 찾기</Title>
      <Form onSubmit={handleSubmit}>
        <InputContainer>
          <Label htmlFor="studentId">학번</Label>
          <StyledInput
            type="text"
            name="studentId"
            id="studentId"
            placeholder="학번을 입력하세요."
            value={formData.studentId}
            onChange={handleInputChange}
            hasError={!!errors.studentId}
          />
          {errors.studentId && <ErrorMessage>{errors.studentId}</ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="name">이름</Label>
          <StyledInput
            type="text"
            name="name"
            id="name"
            placeholder="이름을 입력하세요."
            value={formData.name}
            onChange={handleInputChange}
            hasError={!!errors.name}
          />
          {errors.name && <ErrorMessage>{errors.name}</ErrorMessage>}
        </InputContainer>

        <InputContainer>
          <Label htmlFor="email">이메일</Label>
          <StyledInput
            type="email"
            name="email"
            id="email"
            placeholder="이메일을 입력하세요."
            value={formData.email}
            onChange={handleInputChange}
            hasError={!!errors.email}
          />
          {errors.email && <ErrorMessage>{errors.email}</ErrorMessage>}
        </InputContainer>

        <Submit type="submit">확인</Submit>
      </Form>
    </Container>
  );
}

export default IDSearchPage;
