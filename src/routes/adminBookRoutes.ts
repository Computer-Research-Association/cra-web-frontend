import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminBookRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/book',
  component: lazy(() => import('~/pages/Board/Book/BookAdminPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminBookDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/book/view/$id',
  component: lazy(() => import('~/pages/Board/Book/BookAdminDetailPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminBookUpdateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/book/edit/$id',
  component: lazy(() => import('~/pages/Board/Book/BookAdminEditPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminBookCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/book/write',
  component: lazy(() => import('~/pages/Board/Book/BookAdminWritePage.tsx')),
  beforeLoad: requireAuth,
});
