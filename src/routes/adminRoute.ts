import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: lazy(() => import('~/pages/Admin/AdminPage.tsx')),
});

export const superAdminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/super-admin',
  component: lazy(() => import('~/pages/Admin/SuperAdminPage.tsx')),
});
