import AdminHome from '~/components/Admin/AdminHome.tsx';
import AdminSideBar from '~/components/Admin/AdminSideBar.tsx';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  width: 60%;
  margin-bottom: 10%;
`;

export default function AdminPage() {
  return (
    <Container>
      <AdminSideBar />
      <AdminHome />
    </Container>
  );
}
