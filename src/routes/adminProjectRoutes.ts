import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';
import { rootRoute } from './__root';


export const adminProjectRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/project',
  component: lazy(() => import('~/pages/Board/Project/ProjectAdminPage.tsx')),

});

export const adminProjectDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/project/view/$id',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminDetailPage.tsx'),
  ),

});

export const adminProjectUpdateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/project/edit/$id',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminEditPage.tsx'),
  ),

});

export const adminProjectCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/project/write',
  component: lazy(
    () => import('~/pages/Board/Project/ProjectAdminWritePage.tsx'),
  ),

});
