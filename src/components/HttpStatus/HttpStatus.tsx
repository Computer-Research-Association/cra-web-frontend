import CrangE from '~/assets/images/Status_Crang.png?format=webp&as=srcset';
import styled from 'styled-components';

const Status = styled.div`
  display: flex;
  user-select: none;

  @media (max-width: 900px) {
    scale: 80%;
    transform: translateY(2.5rem);
  }
  @media (max-width: 720px) {
    scale: 70%;
    transform: translateY(5rem);
  }
  @media (max-width: 500px) {
    scale: 60%;
    transform: translateY(7rem);
  }
  @media (max-width: 400px) {
    scale: 50%;
    transform: translateY(10rem);
  }
`;

const StatusNum = styled.p`
  font-family: 'Archivo Black';
  font-size: 16.7rem;
`;

const Img = styled.img`
  width: 15.75rem;
  height: 14.875rem;
  margin-top: 4rem;
`;

function HttpStatus({ statusCode }: { statusCode: number }) {
  const status = statusCode.toString();
  const firstNum = status[0];
  const lastNum = status[status.length - 1];
  return (
    <Status>
      <StatusNum>{firstNum}</StatusNum>
      <Img srcSet={CrangE} loading="lazy" />
      <StatusNum>{lastNum}</StatusNum>
    </Status>
  );
}

export default HttpStatus;
