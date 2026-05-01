import { Outlet } from '@tanstack/react-router';
import styled from 'styled-components';
import AdminSideBar from './AdminSideBar';

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  min-height: calc(100vh - 64px);
  background: var(--color-background);
`;

const Content = styled.main`
  flex: 1;
  padding: 2.5rem 3rem;
  overflow-y: auto;
`;

export default function AdminLayout() {
  return (
    <Wrapper>
      <AdminSideBar />
      <Content>
        <Outlet />
      </Content>
    </Wrapper>
  );
}
