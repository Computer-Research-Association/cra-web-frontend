import { useNavigate } from 'react-router-dom';
import HttpStatus from '~/components/HttpStatus/HttpStatus.tsx';
import WhiteVector from '~/assets/images/Vector/Vector-white.png';
import SkyBlueVector from '~/assets/images/Vector/Vector-skyblue.png';
import styled from 'styled-components';

const STATUSCODE = 403;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10rem;
  margin-bottom: 20rem;
  font-family: 'Pretendard Bold';
  p {
    color: var(--color-primary);
  }
  button {
    font-family: 'Pretendard Bold';
  }
`;

const Content = styled.div`
  p {
    text-align: center;
  }
  margin-bottom: 5rem;
`;

const Title = styled.p`
  font-size: 1.875rem;
  margin-bottom: 3rem;
`;

const Context = styled.p`
  color: var(--color-context-gray) !important;
  font-size: 1.5625rem;
`;

const Buttons = styled.div`
  button {
    font-size: 1.5rem;
    text-align: center;
    border-radius: 0.5rem;
    padding: 0.75rem 2rem;
    margin: 0 1.25rem;
    user-select: none;
    transition: transform 0.2s ease;
    cursor: pointer;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const MainBtn = styled.button`
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
`;

const PrevBtn = styled.button`
  background-color: var(--color-primary);
  color: var(--color-white);
  border: 2px solid var(--color-primary);
`;

function NotFoundPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <HttpStatus statusCode={STATUSCODE} />
      <Content>
        <Title>Forbidden</Title>
        <Context>존재하지 않는 주소를 입력하셨거나,</Context>
        <Context>
          요청하신 페이지의 주소가 변경, 삭제되어 찾을 수 없습니다.
        </Context>
      </Content>
      <Buttons>
        <MainBtn onClick={() => navigate('/')}>
          메인으로 <img src={SkyBlueVector} loading="lazy" />
        </MainBtn>

        <PrevBtn onClick={() => navigate(-1)}>
          이전으로 <img src={WhiteVector} loading="lazy" />
        </PrevBtn>
      </Buttons>
    </Container>
  );
}

export default NotFoundPage;
