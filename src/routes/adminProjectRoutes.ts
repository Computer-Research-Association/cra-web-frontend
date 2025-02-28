import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminProjectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/project',
  component: lazy(() => import('~/pages/Board/Project/ProjectAdminPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminProjectDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/project/view/$id',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminDetailPage.tsx'),
  ),
  beforeLoad: requireAuth,
});

export const adminProjectUpdateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/project/edit/$id',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminEditPage.tsx'),
  ),
  beforeLoad: requireAuth,
});

export const adminProjectCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/project/write',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminWritePage.tsx'),
  ),
  beforeLoad: requireAuth,
});
