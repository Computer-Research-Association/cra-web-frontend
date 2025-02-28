/* eslint-disable */
// @ts-nocheck
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '~/store/authStore.ts';
import HeightSpacer from '~/components/Common/HeightSpacer.tsx';
import CryptoJS from 'crypto-js';
import AlertModal from '~/components/Modal/Alert/AlertModal.tsx';
import { useModalStore } from '~/store/modalStore';
import styled from 'styled-components';
import styles from './LoginForm.module.css';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  max-width: 668px;
  padding-top: 5rem;
  padding-bottom: 10rem;
  margin: 0 auto;
  @media (max-width: 468px) {
    padding-top: 1rem;
  }
`;

const Title = styled.div`
  p {
    text-align: center;
    font-size: 40px;
    font-family: 'Pretendard Bold';
    line-height: 59px;
    margin-bottom: 70px;
    color: var(--color-bright-text);
    user-select: none;
    @media (max-width: 768px) {
      padding-top: 2rem;
      margin-bottom: 15px;
    }
    @media (max-width: 468px) {
      padding-top: 3rem;
      margin-bottom: 15px;
    }
  }
`;

const MainContainer = styled.div`
  @media (max-width: 768px) {
    scale: 95%;
    padding: 0rem 1.5rem;
  }
  @media (max-width: 684px) {
    scale: 90%;
  }
  @media (max-width: 568px) {
    scale: 87.5%;
  }
  @media (max-width: 468px) {
    scale: 85%;
  }
`;

const IdOptionsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
`;

const Search = styled.div`
  text-align: end;
  line-height: 34px;
  user-select: none;
`;

const Login = styled.div`
  input {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%; /* 화면 크기에 맞게 100%로 설정 */
    max-width: 662px; /* 최대 너비 설정 */
    height: 68px;
    background-color: var(--color-primary);
    border: none;
    border-radius: 10px;
    color: var(--color-white);
    font-size: 30px;
    font-family: 'Pretendard Bold';
    margin-top: 40px;
    margin-bottom: 14px;
    cursor: pointer;
  }
`;

const Register = styled.div`
  width: 100%;
  line-height: 34px;
  margin: 1rem 0;
  text-align: center;
  font-size: 16px;
  font-family: 'Pretendard Medium';
  color: var(--color-dark-text);
  user-select: none;
`;

const AuthButtons = styled.div``;

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useAuthStore();
  const navigate = useNavigate();

  const { isOpen: modalIsOpen, openModal, closeModal } = useModalStore();
  const [modalMessage, setModalMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      openModal();
      setModalMessage('모든 항목을 입력해 주세요.');
      return;
    }
    const secretKey = import.meta.env.VITE_SECRET_KEY as string;
    const iv = CryptoJS.enc.Utf8.parse(
      import.meta.env.VITE_SECRET_IV as string,
    );
    const encryptedPassword = CryptoJS.AES.encrypt(
      password,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();
    try {
      await login({ username, password: encryptedPassword });
      void navigate('/main');
    } catch (error: any) {
      console.error('Login Handling Error: ', error);
      if (error.response?.status === 401) {
        setModalMessage('아이디 또는 비밀번호가 올바르지 않습니다.');
      } else {
        setModalMessage('로그인 중 오류가 발생했습니다.');
      }
      openModal();
    }
  };

  return (
    <Container>
      <Title>
        <p>로그인</p>
      </Title>
      <MainContainer>
        <form onSubmit={handleLogin}>
          <div className={styles['id']}>
            <label htmlFor="id">Username</label>
            <input
              type="text"
              placeholder="Enter the Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <HeightSpacer space={28} />
          <div className={styles['password']}>
            <label htmlFor="password">Password</label>
            <div className={styles['password-input-container']}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter the Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <IdOptionsContainer>
            <div className={styles['checkbox-container']}>
              <input
                type="checkbox"
                id="show-password"
                checked={showPassword}
                onChange={(e) => setShowPassword(e.target.checked)}
              />
              <label htmlFor="show-password">비밀번호 보기</label>
            </div>
            <AuthButtons>
              <Search>
                <Link to="/idsearch" className={styles['search-link']}>
                  아이디 찾기
                </Link>
                <span>|</span>
                <Link to="/pwsearch" className={styles['search-link']}>
                  비밀번호 찾기
                </Link>
              </Search>
            </AuthButtons>
          </IdOptionsContainer>
          <Login>
            <input type="submit" value={'로그인'} />
          </Login>
        </form>
        <Register>
          <span>혹시 계정이 없으신가요? </span>
          <Link to="/register" className={styles['register-link']}>
            회원가입하기
          </Link>
        </Register>
      </MainContainer>
      {modalIsOpen && (
        <AlertModal closeModal={closeModal} message={modalMessage} />
      )}
    </Container>
  );
};

export default LoginForm;
