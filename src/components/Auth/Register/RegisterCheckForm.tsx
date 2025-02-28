import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import styles from '../Login/LoginForm.module.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1080px;
  background-color: var(--color-white);
  border-radius: 10px;
  margin-bottom: 4rem;
  @media (max-width: 1200px) {
    width: 80%;
  }
`;

const CheckBoxForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 2rem;
  width: 90%;
  max-width: 500px;
  height: 400px;
  gap: 40px;
  margin: 20px;
`;

const CheckBoxInput = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StyledCheckbox = styled.input`
  width: 15px;
  height: 15px;
  transform: scale(1.4);
  cursor: pointer;
`;

const Label = styled.label`
  font-size: 1.2rem;
  cursor: pointer;
`;

const Button = styled.button`
  padding: 12px;
  font-size: 1.2rem;
  font-family: 'Pretendard SemiBold';
  background-color: var(--color-primary);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: 0.3s;
  &:disabled {
    background-color: var(--color-primary);
    cursor: not-allowed;
  }
  &:hover {
    background-color: var(--color-comment-blue);
  }
`;

function RegisterCheckForm() {
  const navigate = useNavigate();
  const [consent, setConsent] = useState(false);
  const [isOver14, setIsOver14] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!consent || !isOver14) {
      alert('모든 필수 항목에 동의해야 합니다.');
      return;
    }
    void navigate('/register/info');
  };

  return (
    <Container>
      <CheckBoxForm onSubmit={handleSubmit}>
        <CheckBoxInput>
          <StyledCheckbox
            type="checkbox"
            id="consent"
            checked={consent}
            onChange={() => setConsent(!consent)}
          />
          <Label htmlFor="consent">
            개인정보 처리 방침에 동의합니다. (필수)
          </Label>
          <Link to="/privacy-policy" className={styles.PrivacyPolicy}>
            약관 보기
          </Link>
        </CheckBoxInput>

        <CheckBoxInput>
          <StyledCheckbox
            type="checkbox"
            id="isOver14"
            checked={isOver14}
            onChange={() => setIsOver14(!isOver14)}
          />
          <Label htmlFor="isOver14">만 14세 이상입니다. (필수)</Label>
        </CheckBoxInput>

        <Button type="submit" disabled={!consent || !isOver14}>
          다음 단계로 이동
        </Button>
      </CheckBoxForm>
    </Container>
  );
}

export default RegisterCheckForm;
