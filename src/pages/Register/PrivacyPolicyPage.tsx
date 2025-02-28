import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const PrivacyPolicyContainer = styled.div`
  width: 80%;
  max-width: 1080px;
  background-color: var(--color-white);
  border-radius: 10px;
  margin: 2rem auto;
  padding: 50px 30px;
  line-height: 1.6;
`;

const Title = styled.h1`
  font-family: 'Pretendard SemiBold';
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const Paragraph = styled.p`
  font-family: 'Pretendard Medium';
  font-size: 1rem;
  margin-bottom: 1rem;
  span {
    color: var(--color-primary);
    font-family: 'Pretendard Bold' !important;
  }
`;

const LinkButton = styled.button`
  background-color: var(--color-primary);
  color: white;
  font-family: 'Pretendard SemiBold';
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  margin-top: 20px;
  padding: 10px 20px;
  cursor: pointer;
  &:hover {
    background-color: var(--color-comment-blue);
  }
`;

function PrivacyPolicyPage() {
  const navigate = useNavigate();
  const goBackRegister = () => {
    void navigate('/register');
  };
  return (
    <PrivacyPolicyContainer>
      <Title>개인정보 처리 방침</Title>

      <Paragraph>
        본 개인정보 처리 방침은 본 서비스가 이용자의 개인정보를 어떻게 수집,
        사용, 보호하는지에 대해 설명합니다.
        <br />
        당사는 개인정보 보호를 매우 중요하게 생각하며, 이용자의 개인정보를
        안전하게 보호하기 위해 최선을 다하고 있습니다.
      </Paragraph>

      <Paragraph>
        1. <span>수집하는 개인정보</span> - 이름, 이메일, 전화번호 등 - 서비스
        이용 기록 및 접속 로그
      </Paragraph>

      <Paragraph>
        2. <span>개인정보의 사용 목적</span> - 회원가입, 로그인 등 기본적인
        서비스 제공 - 마케팅 및 광고에 활용 (선택 사항)
      </Paragraph>

      <Paragraph>
        3. <span>개인정보의 보유 및 파기</span> - 개인정보는 서비스 제공에
        필요한 기간 동안 보유되며, 이후 안전하게 파기됩니다.
      </Paragraph>

      <Paragraph>
        4. <span>개인정보의 제3자 제공</span> - 당사는 이용자의 개인정보를
        제3자에게 제공하지 않습니다, 단, 법적 요구 사항에 의한 경우는
        제외합니다.
      </Paragraph>

      <Paragraph>
        5. <span>이용자의 권리</span> - 이용자는 언제든지 자신의 개인정보 열람,
        수정, 삭제를 요청할 수 있습니다.
      </Paragraph>

      <LinkButton onClick={() => goBackRegister()}>뒤로 가기</LinkButton>
    </PrivacyPolicyContainer>
  );
}

export default PrivacyPolicyPage;
