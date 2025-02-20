import { useNavigate, useLocation } from 'react-router-dom';
import BlueCheck from '~/assets/images/Blue-Check.png';
import styled from 'styled-components';

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

const Img = styled.img`
  user-select: none;
`;

const Title = styled.p`
  color: var(--color-primary);
  font-size: 2.5rem;
  font-family: 'Pretendard Bold';
  margin: 3rem 0;
`;

const Content = styled.div`
  width: 47.5rem;
  background-color: var(--color-white);
  color: var(--color-dark-text);
  font-size: 1.5625rem;
  font-family: 'Pretendard Bold';
  border-radius: 1rem;
  padding: 1rem 2rem;
`;

const Context = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
  width: 100%;
`;

const SkyBlue = styled.p`
  color: var(--color-primary);
  text-align: center;
  width: 100%;
`;

const Buttons = styled.div`
  display: flex;
  gap: 2rem;
`;

const PWResetBtn = styled.button`
  margin: 5rem 0 20rem 0;
  background-color: var(--color-white);
  border: 2px solid var(--color-primary);
  border-radius: 1rem;
  color: var(--color-primary);
  font-size: 2rem;
  padding: 1rem 5rem;
  font-family: 'Pretendard Bold';
  cursor: pointer;
`;

const LoginBtn = styled.button`
  margin: 5rem 0 20rem 0;
  background-color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 1rem;
  color: #ffffff;
  font-size: 2rem;
  padding: 1rem 5rem;
  font-family: 'Pretendard Bold';
  cursor: pointer;
`;

function IDSearchCompletePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // URL에서 id 값을 가져오기
  const queryParams = new URLSearchParams(location.search);
  const userId = queryParams.get('id') || '알 수 없음'; // id가 없으면 기본값 설정

  return (
    <Container>
      <Img src={BlueCheck} />
      <Title>아이디 찾기 완료</Title>
      <Content>
        <Context>
          <SkyBlue>
            회원님의 아이디는 &nbsp;&nbsp; {userId} &nbsp;&nbsp; 입니다.
          </SkyBlue>
        </Context>
      </Content>
      <Buttons>
        <PWResetBtn onClick={() => navigate('/pwsearch/reset')}>
          비밀번호 재설정
        </PWResetBtn>
        <LoginBtn onClick={() => navigate('/login')}>로그인 바로하기</LoginBtn>
      </Buttons>
    </Container>
  );
}

export default IDSearchCompletePage;
