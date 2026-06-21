import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.nav`
  width: 280px;
  flex-shrink: 0;
  background: white;
  border-right: 1px solid #e8edf3;
  display: flex;
  flex-direction: column;
`;

const LogoSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 1.75rem 1.5rem 1.5rem;
  border-bottom: 1px solid #e8edf3;
`;

const LogoBadge = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: var(--color-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard Bold';
  font-size: 15px;
  color: white;
  flex-shrink: 0;
`;

const LogoText = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoTitle = styled.span`
  font-family: 'Pretendard Bold';
  font-size: 16px;
  color: #1e293b;
  line-height: 1.3;
`;

const LogoSub = styled.span`
  font-family: 'Pretendard Regular';
  font-size: 12px;
  color: #94a3b8;
`;

const Menu = styled.ul`
  padding: 1rem 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const MenuItem = styled.li`
  a {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 0.7rem 1rem;
    border-radius: 10px;
    text-decoration: none;
    font-family: 'Pretendard Regular';
    font-size: 15px;
    color: #64748b;
    border-left: 3px solid transparent;
    transition:
      background 0.15s,
      color 0.15s;

    svg {
      flex-shrink: 0;
      opacity: 0.5;
    }

    &:hover {
      background: #f1f5f9;
      color: #1e293b;
      svg {
        opacity: 0.8;
      }
    }

    &.active {
      background: rgba(44, 180, 219, 0.1);
      color: #2cb4db;
      border-left-color: #2cb4db;
      font-family: 'Pretendard SemiBold';
      svg {
        opacity: 1;
      }
    }
  }
`;

const Divider = styled.div`
  height: 1px;
  background: #e8edf3;
  margin: 0.5rem 1rem;
`;

const IconHome = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const IconUsers = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const IconBell = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const IconActivity = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
  </svg>
);

const IconKey = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

export default function AdminSideBar() {
  return (
    <Sidebar>
      <LogoSection>
        <LogoBadge>CR</LogoBadge>
        <LogoText>
          <LogoTitle>CRA Admin</LogoTitle>
          <LogoSub>관리자 패널</LogoSub>
        </LogoText>
      </LogoSection>
      <Menu>
        <MenuItem>
          <NavLink to="/admin" end>
            <IconHome />홈
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem>
          <NavLink to="/admin/allusers">
            <IconUsers />
            유저 전체 정보
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/notice/write">
            <IconBell />
            공지글 쓰기
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/admin/project">
            <IconActivity />
            프로젝트 관리
          </NavLink>
        </MenuItem>
        <Divider />
        <MenuItem>
          <NavLink to="/admin/code">
            <IconKey />
            가입코드 생성
          </NavLink>
        </MenuItem>
      </Menu>
    </Sidebar>
  );
}
