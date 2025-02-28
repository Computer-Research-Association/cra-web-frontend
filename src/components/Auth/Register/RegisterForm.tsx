import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { emailCode, emailRequest } from '~/api/account';
import { signUp } from '~/api/auth/authApi';
import HeightSpacer from '~/components/Common/HeightSpacer';
import CryptoJS from 'crypto-js';
import WidthSpacer from '~/components/Common/WidthSpacer';
import AlertModal from '~/components/Modal/Alert/AlertModal';
import { ReqSignUp } from '~/models/Auth';
import RegisterInputTextField from './RegisterInputTextField';
import RegisterPasswordTextField from './RegisterPasswordTextField';
import { useRegisterStore } from '~/store/registerStore';
import axios from 'axios';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1600px;
  margin-bottom: 4rem;
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

const RegisterInputForm = styled.form`
  font-size: 1.25rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 600px;
  background-color: var(--color-white);
  border-radius: 1rem;
  padding: 3rem 2rem;

  @media (max-width: 768px) {
    padding: 3rem 1.5rem;
  }

  button {
    background-color: var(--color-primary);
    color: var(--color-white);
    max-width: 400px;
    font-family: 'Pretendard Bold';
    font-size: 1.25rem;
    text-align: center;
    padding: 0.9rem 0;
    border: none;
    border-radius: 0.75rem;
    cursor: pointer;
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

  input:read-only {
    background-color: var(--color-background);
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

const EmailInput = styled.div`
  background-color: var(--color-white);
  color: var(--color-dark-text);
  font-size: 1.25rem;
  border: 1px solid var(--color-dark-stroke);
  border-radius: 0.5rem;
  box-sizing: border-box;
  height: 66px;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 1rem;

  input {
    background-color: transparent;
    height: 100%;
    border: none;
  }
`;

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ValidButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 66px;
  width: 20%;

  &:disabled {
    background-color: gray;
    cursor: default;
    opacity: 0.6;
  }
`;

const EmailCodeReTransmit = styled.button`
  background-color: var(--color-secondary-button) !important;
  height: 66px;
  width: 17%;
`;

const EmailCodeButton = styled.button`
  height: 66px;
  width: 20%;
`;

const SubmitBtn = styled.button`
  width: 20%;
  margin-top: 2rem;
`;

const EMAIL_VERIFICATION_TIME = 300;

function RegisterForm() {
  const navigate = useNavigate();

  const { setName, setUserName } = useRegisterStore();

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordCheck: '',
    studentId: '',
    name: '',
    email: '',
    term: '',
    githubId: '',
    code: '',
  });
  const [emailCodeValue, setEmailCodeValue] = useState('');

  const [emailLoading, setEmailLoading] = useState(false);
  const [emailCodeLoading, setEmailCodeLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const [isCodeRequired, setIsCodeRequired] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const [error, setError] = useState('');
  const [inputErrors, setInputErrors] = useState<{ [key: string]: boolean }>(
    {},
  );
  const [errorMessages, setErrorMessages] = useState<{
    [key: string]: string;
  }>({});

  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태 추가

  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateField = (name: string, value: string) => {
    if (!value) return { valid: false, message: '값을 입력해 주세요.' };
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
      return { valid: false, message: '올바르지 않은 이메일 형식입니다.' };
    if (name === 'studentId') {
      if (!/^\d+$/.test(value))
        return { valid: false, message: '숫자로만 입력해 주세요.' };
      if (value.length != 8)
        return { valid: false, message: '8글자로 입력해 주세요.' };
    }
    if (name === 'term') {
      if (!/^\d{2}-\d$/.test(value))
        return { valid: false, message: '올바른 형식이 아닙니다.' };
    }
    if (name === 'password') {
      const passwordRegex =
        /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(value))
        return {
          valid: false,
          message:
            '비밀번호는 8자 이상이어야 하며, 대문자와 특수 문자를 포함해야 합니다.',
        };
    }
    if (name === 'passwordCheck') {
      if (value !== formData.password)
        return { valid: false, message: '비밀번호가 일치하지 않습니다.' };
    }
    return { valid: true, message: '' };
  };

  const sendEmailRequest = async () => {
    if (emailLoading) return;
    setEmailLoading(true);

    if (formData.email === '') {
      setIsModalOpen(true);
      setModalMessage('이메일을 입력해 주세요.');
      setEmailLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setIsModalOpen(true);
      setModalMessage('올바른 이메일 형식이 아닙니다.');
      setEmailLoading(false);
      return;
    }

    try {
      const resStatus = await emailRequest(formData.email);

      if (resStatus === 200) {
        setIsCodeRequired(true);
        setTimeLeft(EMAIL_VERIFICATION_TIME);
        setIsTimerRunning(true);
        setIsModalOpen(true);
        setModalMessage('이메일을 확인해 주세요.');
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setIsModalOpen(true);
          setModalMessage('이미 가입된 이메일입니다.');
          setEmailLoading(false);
          return;
        }
      }
      setIsModalOpen(true);
      setModalMessage('이메일 확인 중 에러가 발생하였습니다.');
    }

    setEmailLoading(false);
  };

  const emailValidCheck = async () => {
    if (emailCodeLoading) return;
    setEmailCodeLoading(true);
    const resStatus = await emailCode(emailCodeValue);
    if (resStatus === 200) {
      setIsModalOpen(true);
      setModalMessage('이메일 인증을 성공하였습니다.');
      setIsCodeRequired(false);
      setIsTimerRunning(false);
      setIsValid(true);
    } else {
      setIsModalOpen(true);
      setModalMessage('이메일 인증 중 에러가 발생하였습니다.');
    }
    setEmailCodeLoading(false);
  };

  const emailRetransmit = () => {
    setIsCodeRequired(false);
    setIsTimerRunning(false);
    setIsValid(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { valid, message } = validateField(name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !valid,
    }));
    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      [name]: message,
    }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const { valid, message } = validateField(name, value);

    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setInputErrors((prevErrors) => ({
      ...prevErrors,
      [name]: !valid,
    }));
    setErrorMessages((prevMessages) => ({
      ...prevMessages,
      [name]: message,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setUserName(formData.username);
    setName(formData.name);

    if (submitLoading) return;
    setSubmitLoading(true);
    // Check if any field is empty
    // 모든 필드가 채워졌는지 확인
    for (const key in formData) {
      if (!formData[key as keyof typeof formData]) {
        // 타입 단언 추가
        setIsModalOpen(true); // 모달 열기
        setModalMessage('모든 항목을 입력해 주세요.');
        setSubmitLoading(false);
        return;
      }
    }

    const termRegex = /^\d{2}-\d$/; // "00-0"
    const studentIdRegex = /^\d+$/; // 숫자만

    if (formData.password.length < 8) {
      setIsModalOpen(true); // 모달 열기
      setModalMessage('비밀번호는 8글자 이상이어야 합니다.');
      setSubmitLoading(false);
      return;
    }
    if (
      !studentIdRegex.test(formData.studentId) ||
      formData.studentId.length < 8
    ) {
      setIsModalOpen(true); // 모달 열기
      setModalMessage('학번은 8글자 숫자로 이루어져야 합니다.');
      setSubmitLoading(false);
      return;
    }
    if (!termRegex.test(formData.term)) {
      setIsModalOpen(true); // 모달 열기
      setModalMessage('올바르지 않은 기수 번호입니다.');
      setSubmitLoading(false);
      return;
    }
    if (formData.password !== formData.passwordCheck) {
      setIsModalOpen(true); // 모달 열기
      setModalMessage('비밀번호가 일치하지 않습니다.');
      setSubmitLoading(false);
      return;
    }
    if (!isValid) {
      setIsModalOpen(true); // 모달 열기
      setModalMessage('이메일을 인증해주세요.');
      setSubmitLoading(false);
      return;
    }

    const secretKey: string = import.meta.env.VITE_SECRET_KEY as string;
    const iv = CryptoJS.enc.Utf8.parse(
      import.meta.env.VITE_SECRET_IV as string,
    );
    const encryptedPassword = CryptoJS.AES.encrypt(
      formData.password,
      CryptoJS.enc.Utf8.parse(secretKey),
      {
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    ).toString();

    setError('');
    const requestBody: ReqSignUp = {
      ...formData,
      password: encryptedPassword,
      studentId: parseInt(formData.studentId),
    };

    try {
      await signUp(requestBody);
      setIsModalOpen(true); // 모달 열기
      setModalMessage('회원가입이 완료되었습니다.');
      void navigate('/register/complete');
    } catch (error) {
      if (error instanceof Error) {
        setIsModalOpen(true); // 모달 열기
        setModalMessage(error.message);
      }
    } finally {
      setSubmitLoading(false);
    }
  };

  useEffect(() => {
    if (timeLeft > 0 && isTimerRunning) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsTimerRunning(false);
    }
  }, [timeLeft, isTimerRunning]);

  // 남은 시간을 MM:SS 형식으로 변환
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  return (
    <Container>
      <Title>회원가입</Title>
      <RegisterInputForm onSubmit={handleSubmit}>
        <RegisterInputTextField
          name="username"
          value={formData.username}
          label="아이디"
          placeHolder="아이디를 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['username']}
          errorMessage={errorMessages['username']}
        />
        <RegisterPasswordTextField
          name="password"
          value={formData.password}
          label="비밀번호"
          placeHolder="비밀번호를 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['password']}
          errorMessage={errorMessages['password']}
        />
        <RegisterPasswordTextField
          name="passwordCheck"
          value={formData.passwordCheck}
          label="비밀번호 확인"
          placeHolder="비밀번호를 한번 더 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['passwordCheck']}
          errorMessage={errorMessages['passwordCheck']}
        />
        <RegisterInputTextField
          name="studentId"
          value={formData.studentId}
          label="학번 (22500123)"
          placeHolder="학번을 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['studentId']}
          errorMessage={errorMessages['studentId']}
        />
        <RegisterInputTextField
          name="name"
          value={formData.name}
          label="이름"
          placeHolder="이름을 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['name']}
          errorMessage={errorMessages['name']}
        />
        <Input>
          <label htmlFor="name">E-mail</label>
          <EmailContainer>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="E-mail을 입력하세요."
              value={formData.email}
              onChange={handleChange}
              readOnly={
                isValid || isCodeRequired || emailLoading || emailCodeLoading
              }
            />{' '}
            <WidthSpacer space={6} />
            <ValidButton
              type="button"
              onClick={sendEmailRequest}
              disabled={isValid}
            >
              {emailLoading ? (
                <ClipLoader size={25} color="#fff" />
              ) : (
                '이메일 인증'
              )}
            </ValidButton>
          </EmailContainer>
          {isCodeRequired && (
            <>
              <HeightSpacer space={6} />
              <EmailContainer>
                <EmailInput>
                  <input
                    type="text"
                    name="emailCode"
                    id="emailCode"
                    placeholder="인증코드를 입력하세요."
                    value={emailCodeValue}
                    onChange={(e) => setEmailCodeValue(e.target.value)}
                    readOnly={isValid}
                  />
                  <WidthSpacer space={30} />
                  <div>{formatTime(timeLeft)}</div>
                </EmailInput>
                <WidthSpacer space={6} />
                <EmailCodeReTransmit type="button" onClick={emailRetransmit}>
                  재전송
                </EmailCodeReTransmit>
                <WidthSpacer space={6} />
                <EmailCodeButton type="button" onClick={emailValidCheck}>
                  {emailCodeLoading ? (
                    <ClipLoader size={25} color="#fff" />
                  ) : (
                    '확인'
                  )}
                </EmailCodeButton>
              </EmailContainer>
            </>
          )}
        </Input>
        <RegisterInputTextField
          name="term"
          value={formData.term}
          label="CRA 기수 (25-1)"
          placeHolder="CRA 기수를 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['term']}
          errorMessage={errorMessages['term']}
        />
        <RegisterInputTextField
          name="githubId"
          value={formData.githubId}
          label="GitHub 아이디"
          placeHolder="GitHub 아이디를 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['githubId']}
          errorMessage={errorMessages['githubId']}
        />
        <RegisterInputTextField
          name="code"
          value={formData.code}
          label="가입코드"
          placeHolder="관리자로부터 받은 가입코드를 입력해 주세요."
          onChange={handleChange}
          onBlur={handleBlur}
          valid={!inputErrors['code']}
          errorMessage={errorMessages['code']}
        />

        {error && <p style={{ color: 'var(--color-error)' }}>{error}</p>}

        <SubmitBtn type="submit">
          {submitLoading ? <ClipLoader size={25} color="#fff" /> : '확인'}
        </SubmitBtn>
      </RegisterInputForm>
      {isModalOpen && (
        <AlertModal
          closeModal={() => setIsModalOpen(false)}
          message={modalMessage}
        />
      )}
    </Container>
  );
}

export default RegisterForm;
