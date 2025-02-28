import React, { useState } from 'react';
import { ClipLoader } from 'react-spinners';
import styled from 'styled-components';
import AlertModal from '~/components/Modal/Alert/AlertModal';
import { useModalStore } from '~/store/modalStore';
import { pwEmailRequest } from '~/api/account';
import { AxiosError } from 'axios';

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

const ResetForm = styled.form`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 600px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 4rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }
`;

const Input = styled.div`
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
    border: 1px solid var(--color-dark-stroke);
    border-radius: 0.5rem;
    padding: 1.5rem 1rem;
    box-sizing: border-box;
    height: 66px;
    flex: 1;

    @media (max-width: 480px) {
      padding: 1.2rem 0.8rem;
    }
  }

  input.error {
    border-color: var(--color-error);
  }

  div.error {
    margin-top: 0.25rem;
    margin-left: 0.25rem;
    color: var(--color-error);
    font-size: 1rem;
  }
`;

const ResetButton = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  width: 50%;
  max-width: 400px;
  font-family: 'Pretendard Bold';
  font-size: 1.25rem;
  text-align: center;
  padding: 0.9rem 0;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: var(--color-gray-text);
    cursor: default;
    opacity: 0.6;
  }
`;

const Comment = styled.div`
  font-size: 10px;
  color: var(--color-brighter-border);
  margin-top: 10px;
`;

function PasswordResetForm() {
  const { openModal, closeModal, isOpen } = useModalStore();
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [inputError, setInputError] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const safeOpenModal = (message: string) => {
    setModalMessage(message);
    if (!isOpen) {
      openModal();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    setInputError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!username.trim()) {
      setInputError('아이디를 입력해 주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await pwEmailRequest(username.trim());

      if (response === 200) {
        safeOpenModal(
          `${username}으로 비밀번호 재설정 메일이 발송되었습니다. 이메일을 확인해 주세요.`,
        );
        setUsername('');
      }
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error('Full error:', error);
        console.error('Error response:', error.response);
        console.error('Error status:', error.response?.status);
        console.error('Error data:', error.response?.data);

        const status = error.response?.status;
        const errorData = error.response?.data as { message?: string };

        if (errorData?.message) {
          safeOpenModal(errorData.message);
        } else {
          switch (status) {
            case 404:
              safeOpenModal('존재하지 않는 아이디입니다.');
              break;
            case 400:
              safeOpenModal('잘못된 요청입니다. 다시 시도해 주세요.');
              break;
            case 429:
              safeOpenModal('잠시 후 다시 시도해 주세요.');
              break;
            default:
              safeOpenModal(
                '비밀번호 재설정 메일 발송에 실패했습니다. 다시 시도해 주세요.',
              );
          }
        }
      } else if (error instanceof Error) {
        console.error('Error message:', error.message);
        safeOpenModal('오류가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      } else {
        console.error('Unknown error:', error);
        safeOpenModal('예기치 않은 오류가 발생했습니다.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container>
      <Title>비밀번호 찾기</Title>
      <ResetForm onSubmit={handleSubmit}>
        <Input>
          <label htmlFor="username">User ID</label>
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력해 주세요."
            value={username}
            onChange={handleChange}
            className={inputError ? 'error' : ''}
          />
          {inputError && <div className="error">{inputError}</div>}
        </Input>
        <ResetButton type="submit" disabled={isLoading || !username.trim()}>
          {isLoading ? (
            <ClipLoader size={25} color="#fff" />
          ) : (
            '비밀번호 재설정 메일 발송'
          )}
        </ResetButton>
        <Comment>
          ID에 등록된 이메일로 비밀번호 재설정 링크가 전송됩니다.
        </Comment>
      </ResetForm>

      {isOpen && <AlertModal closeModal={closeModal} message={modalMessage} />}
    </Container>
  );
}

export default PasswordResetForm;
