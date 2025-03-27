import { createRoute, redirect } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { useAuthStore } from '~/store/authStore';

const requireAuth = () => {
  const { isAuthenticated } = useAuthStore.getState();
  if (!isAuthenticated) {
    return redirect({ to: '/login' });
  }
};

export const bookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/book',
  component: lazy(() => import('~/pages/Board/Book/BookPage.tsx')),
  beforeLoad: requireAuth,
});
