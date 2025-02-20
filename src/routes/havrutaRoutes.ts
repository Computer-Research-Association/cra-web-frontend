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

export const havrutaRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/havruta',
  component: lazy(
    () => import('~/pages/Board/Havruta/HavrutaBoard/HavrutaBoardPage.tsx'),
  ),
  beforeLoad: requireAuth,
});

export const havrutaViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/havruta/view/$id',
  component: lazy(
    () =>
      import('~/pages/Board/Havruta/HavrutaBoard/HavrutaBoardDetailPage.tsx'),
  ),
  beforeLoad: requireAuth,
});

export const havrutaEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/havruta/edit/$id',
  component: lazy(
    () => import('~/pages/Board/Havruta/HavrutaBoard/HavrutaBoardEditPage.tsx'),
  ),
  beforeLoad: requireAuth,
});

export const havrutaWriteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/havruta/write',
  component: lazy(
    () =>
      import('~/pages/Board/Havruta/HavrutaBoard/HavrutaBoardWritePage.tsx'),
  ),
  beforeLoad: requireAuth,
});
