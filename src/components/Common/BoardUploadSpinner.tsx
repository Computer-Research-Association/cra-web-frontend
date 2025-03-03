import styled, { keyframes } from 'styled-components';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.7); /* 흰색 배경에 투명도 적용 */
  backdrop-filter: blur(3px); /* 배경 흐림 효과 추가 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999; /* 최상위에 표시되도록 z-index 높게 설정 */
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid var(--color-i-taxi);
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin-bottom: 10px;
`;

const BoardUploadSpinner = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};

export default BoardUploadSpinner;
