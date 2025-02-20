import React from 'react';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import styled from 'styled-components';
import { changePassword } from '~/api/account';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 4rem;
  padding-top: 5rem;
  padding-bottom: 12rem;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 40px;
  line-height: 59px;
  margin-bottom: 70px;
  color: var(--color-bright-text);
  @media (max-width: 768px) {
    margin-bottom: 3rem;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 700px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 3rem 4rem;
  width: 90%;
  max-width: 600px;
`;

const Input = styled.div<{ error?: boolean; focused?: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 2rem;

  label {
    color: var(--color-dark);
    font-family: 'Pretendard SemiBold';
    font-size: 1.25rem;
    margin-bottom: 0.75rem;
    user-select: none;
  }

  input {
    background-color: var(--color-white);
    color: var(--color-dark-text);
    font-size: 1.25rem;
    border: 2px solid
      ${({ error, focused }) =>
        error ? 'red' : focused ? 'black' : 'var(--color-dark-stroke)'};
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;
    outline: none;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  div.error {
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    color: red;
    font-size: 1rem;
  }
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

function PWResetPage() {
  const navigate = useNavigate();
  const [newPW, setNewPW] = useState('');
  const [checkPW, setCheckPW] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [checkPasswordError, setCheckPasswordError] = useState(false);
  const [newPWFocused, setNewPWFocused] = useState(false);
  const [checkPWFocused, setCheckPWFocused] = useState(false);
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');

  // 비밀번호 유효성 검사
  const validatePassword = (password: string) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) && // 대문자 포함
      /[!@#$%^&*(),.?":{}|<>]/.test(password) // 특수문자 포함
    );
  };

  // 새 비밀번호 입력 핸들러 (실시간 유효성 검사)
  const handleNewPWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewPW(value);
    setPasswordError(!validatePassword(value)); // 입력할 때마다 검증
  };

  // 비밀번호 확인 입력 핸들러
  const handleCheckPWChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCheckPW(value);
    setCheckPasswordError(newPW !== value); // 입력할 때마다 비교
  };

  const handlePasswordReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!code) {
      alert('잘못된 접근입니다. 인증 코드가 없습니다.');
      return;
    }

    if (!validatePassword(newPW)) {
      setPasswordError(true);
      alert('비밀번호는 8자 이상, 대문자 및 특수 문자를 포함해야 합니다.');
      return;
    }
    setPasswordError(false);

    if (newPW !== checkPW) {
      setCheckPasswordError(true);
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    setCheckPasswordError(false);

    const secretKey = import.meta.env.VITE_SECRET_KEY;
    const ivKey = import.meta.env.VITE_SECRET_IV;

    if (!secretKey || !ivKey) {
      alert('서버 설정 오류: 암호화 키가 없습니다.');
      return;
    }

    const iv = CryptoJS.enc.Utf8.parse(ivKey);
    const encryptedPassword = CryptoJS.AES.encrypt(
      newPW,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();

    try {
      const status = await changePassword({
        code,
        password: encryptedPassword,
      });

      if (status === 200) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        await navigate('/pwsearch/complete');
      } else {
        throw new Error(`서버 오류: 상태 코드 ${status}`);
      }
    } catch {
      alert('비밀번호 변경 중 오류가 발생했습니다.');
    }
  };

  return (
    <Container>
      <Title>비밀번호 재설정</Title>
      <Form onSubmit={handlePasswordReset}>
        <Input error={passwordError} focused={newPWFocused}>
          <label htmlFor="newPW">새 비밀번호</label>
          <input
            type="password"
            id="newPW"
            placeholder="새 비밀번호를 입력하세요."
            value={newPW}
            onFocus={() => setNewPWFocused(true)}
            onBlur={() => setNewPWFocused(false)}
            onChange={handleNewPWChange}
          />
          {passwordError && (
            <div className="error">
              비밀번호는 8자 이상, 대문자 및 특수 문자를 포함해야 합니다.
            </div>
          )}
        </Input>
        <Input error={checkPasswordError} focused={checkPWFocused}>
          <label htmlFor="checkPW">비밀번호 확인</label>
          <input
            type="password"
            id="checkPW"
            placeholder="비밀번호를 다시 입력하세요."
            value={checkPW}
            onFocus={() => setCheckPWFocused(true)}
            onBlur={() => setCheckPWFocused(false)}
            onChange={handleCheckPWChange}
          />
          {checkPasswordError && (
            <div className="error">비밀번호가 일치하지 않습니다.</div>
          )}
        </Input>
        <Submit type="submit">확인</Submit>
      </Form>
    </Container>
  );
}

export default PWResetPage;
