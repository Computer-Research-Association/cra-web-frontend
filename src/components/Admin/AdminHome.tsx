import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { useUserStore } from '~/store/userStore';
import { getProjects } from '~/api/project';
import { getBoardsByCategory } from '~/api/board';
import { authClient } from '~/api/auth/authClient';

// ────────────────────────────── Styled ──────────────────────────────

const PageHeader = styled.div`
  margin-bottom: 2rem;
`;

const PageTitle = styled.h1`
  font-family: 'Pretendard Bold';
  font-size: 32px;
  color: var(--color-dark-text);
  margin-bottom: 0.3rem;
`;

const PageSubtitle = styled.p`
  font-family: 'Pretendard Regular';
  font-size: 14px;
  color: var(--color-brighter-text);
`;

const StatRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.25rem;
  margin-bottom: 1.5rem;
`;

const StatCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 1.75rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const StatTop = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const StatIconWrap = styled.div`
  width: 42px;
  height: 42px;
  border-radius: 10px;
  background: #e8f7fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
`;

const StatLabel = styled.span`
  font-family: 'Pretendard SemiBold';
  font-size: 15px;
  color: var(--color-dark-text);
`;

const StatValue = styled.div`
  font-family: 'Pretendard Bold';
  font-size: 36px;
  color: var(--color-dark-text);
  line-height: 1;

  span {
    font-family: 'Pretendard Regular';
    font-size: 16px;
    color: var(--color-brighter-text);
    margin-left: 4px;
  }
`;

const QuickCard = styled.div`
  background: white;
  border-radius: 14px;
  padding: 1.75rem 2rem;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
`;

const QuickTitle = styled.h2`
  font-family: 'Pretendard Bold';
  font-size: 17px;
  color: var(--color-dark-text);
  margin-bottom: 1.25rem;
`;

const QuickGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0;
`;

const QuickItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 1rem 1rem;
  border-radius: 10px;
  text-decoration: none;
  transition: background 0.15s;

  &:hover {
    background: #f7fafb;
  }
`;

const QuickIconWrap = styled.div`
  width: 38px;
  height: 38px;
  border-radius: 9px;
  background: #e8f7fc;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-primary);
  flex-shrink: 0;
`;

const QuickText = styled.div`
  flex: 1;
  min-width: 0;
`;

const QuickLabel = styled.div`
  font-family: 'Pretendard SemiBold';
  font-size: 14px;
  color: var(--color-dark-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const QuickDesc = styled.div`
  font-family: 'Pretendard Regular';
  font-size: 12px;
  color: var(--color-brighter-text);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChevronRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#c1c1c1"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

// ────────────────────────────── Icons ──────────────────────────────

const IconUsers = () => (
  <svg
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="20"
    height="20"
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
    width="17"
    height="17"
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

// ────────────────────────────── Data ──────────────────────────────

const NOTICE_CATEGORY = 0;

const quickMenuItems = [
  {
    label: '공지글 쓰기',
    desc: '새 공지사항을 게시합니다',
    to: '/admin/notice/write',
    icon: <IconBell />,
  },
  {
    label: '유저 전체 정보',
    desc: '회원 목록 및 권한 관리',
    to: '/admin/allusers',
    icon: <IconUsers />,
  },
  {
    label: '프로젝트 관리',
    desc: '완료 프로젝트 게시물 관리',
    to: '/admin/project',
    icon: <IconActivity />,
  },
  {
    label: '가입코드 생성',
    desc: '새 초대코드를 생성합니다',
    to: '/admin/code',
    icon: <IconKey />,
  },
];

const WEEKDAY = [
  '일요일',
  '월요일',
  '화요일',
  '수요일',
  '목요일',
  '금요일',
  '토요일',
];

function formatDate(date: Date) {
  const y = date.getFullYear();
  const m = date.getMonth() + 1;
  const d = date.getDate();
  const day = WEEKDAY[date.getDay()];
  return `${y}년 ${m}월 ${d}일 ${day}`;
}

// ────────────────────────────── Component ──────────────────────────────

function AdminHome() {
  const name = useUserStore((s) => s.name);

  const { data: projectData } = useQuery({
    queryKey: ['admin.stat.projects'],
    queryFn: () => getProjects(1, 1, 0),
  });

  const { data: noticeData } = useQuery({
    queryKey: ['admin.stat.notices'],
    queryFn: () => getBoardsByCategory(NOTICE_CATEGORY, 1, 1, 0),
  });

  const { data: userData } = useQuery({
    queryKey: ['admin.stat.users'],
    queryFn: async () => {
      const res = await authClient.get<{ totalPages: number }>(
        '/admin/account/users/page/1',
        { params: { perPage: 1 } },
      );
      return res.data;
    },
  });

  const projectCount = projectData?.totalPages ?? '—';
  const noticeCount = noticeData?.totalPages ?? '—';
  const userCount = userData?.totalPages ?? '—';

  return (
    <>
      <PageHeader>
        <PageTitle>어드민 홈</PageTitle>
        <PageSubtitle>
          {formatDate(new Date())} &nbsp;·&nbsp; 안녕하세요, {name || '관리자'}
          님
        </PageSubtitle>
      </PageHeader>

      <StatRow>
        <StatCard>
          <StatTop>
            <StatIconWrap>
              <IconUsers />
            </StatIconWrap>
            <StatLabel>전체 유저</StatLabel>
          </StatTop>
          <StatValue>
            {userCount}
            <span>명</span>
          </StatValue>
        </StatCard>
        <StatCard>
          <StatTop>
            <StatIconWrap>
              <IconBell />
            </StatIconWrap>
            <StatLabel>공지사항</StatLabel>
          </StatTop>
          <StatValue>
            {noticeCount}
            <span>건</span>
          </StatValue>
        </StatCard>
        <StatCard>
          <StatTop>
            <StatIconWrap>
              <IconActivity />
            </StatIconWrap>
            <StatLabel>게시된 프로젝트</StatLabel>
          </StatTop>
          <StatValue>
            {projectCount}
            <span>개</span>
          </StatValue>
        </StatCard>
      </StatRow>

      <QuickCard>
        <QuickTitle>빠른 메뉴</QuickTitle>
        <QuickGrid>
          {quickMenuItems.map(({ label, desc, to, icon }) => (
            <QuickItem key={to} to={to}>
              <QuickIconWrap>{icon}</QuickIconWrap>
              <QuickText>
                <QuickLabel>{label}</QuickLabel>
                <QuickDesc>{desc}</QuickDesc>
              </QuickText>
              <ChevronRight />
            </QuickItem>
          ))}
        </QuickGrid>
      </QuickCard>
    </>
  );
}

export default AdminHome;
