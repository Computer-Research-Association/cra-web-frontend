import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';
import { rootRoute } from './__root';


export const adminBookRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/book',
  component: lazy(() => import('~/pages/Board/Book/BookAdminPage.tsx')),

});

export const adminBookDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/book/view/$id',
  component: lazy(() => import('~/pages/Board/Book/BookAdminDetailPage.tsx')),

});

export const adminBookUpdateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/book/edit/$id',
  component: lazy(() => import('~/pages/Board/Book/BookAdminEditPage.tsx')),

});

export const adminBookCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/book/write',
  component: lazy(() => import('~/pages/Board/Book/BookAdminWritePage.tsx')),

});
