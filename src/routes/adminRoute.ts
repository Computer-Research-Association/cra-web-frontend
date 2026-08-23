import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';

export const adminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin',
  component: lazy(() => import('~/pages/Admin/AdminPage.tsx')),
});

export const superAdminRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/code',
  component: lazy(() => import('~/pages/Admin/SuperAdminPage.tsx')),
});
