import { useNavigate } from 'react-router-dom';
import HttpStatus from '~/components/HttpStatus/HttpStatus.tsx';
import WhiteVector from '~/assets/images/Vector/Vector-white.png';
import SkyBlueVector from '~/assets/images/Vector/Vector-skyblue.png';
import styled from 'styled-components';

const STATUSCODE = 500;

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

function ServerErrorPage() {
  const navigate = useNavigate();
  return (
    <Container>
      <HttpStatus statusCode={STATUSCODE} />
      <Content>
        <Title>서버 오류</Title>
        <Context>죄송합니다! 서버에서 문제가 발생했습니다.</Context>
        <Context>
          잠시 후 다시 시도해 주세요. 문제가 지속되면 관리자에게 문의해주세요.
        </Context>
        <Context>
          불편을 끼쳐 드려 죄송합니다. 가능한 빠르게 해결하겠습니다.
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

export default ServerErrorPage;
