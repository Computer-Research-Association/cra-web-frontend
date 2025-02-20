import { createRoute, redirect } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { useAuthStore } from '~/store/authStore';

const requireAuth = () => {
  const { isAuthenticated } = useAuthStore.getState(); // 현재 로그인 상태 확인
  if (!isAuthenticated) {
    return redirect({ to: '/login' }); // 로그인 안했으면 로그인 페이지로 이동
  }
};

export const academicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic',
  component: lazy(() => import('~/pages/Board/Academic/AcademicPage.tsx')),
  beforeLoad: requireAuth, // 보호된 경로
});

export const academicViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic/view/$id',
  component: lazy(
    () => import('~/pages/Board/Academic/AcademicDetailPage.tsx'),
  ),
  beforeLoad: requireAuth, // 보호된 경로
});

export const academicEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic/edit/$id',
  component: lazy(() => import('~/pages/Board/Academic/AcademicEditPage.tsx')),
  beforeLoad: requireAuth, // 보호된 경로
});

export const academicWriteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/academic/write',
  component: lazy(() => import('~/pages/Board/Academic/AcademicWritePage.tsx')),
  beforeLoad: requireAuth, // 보호된 경로
});
