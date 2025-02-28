import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminItemRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/item',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminItemDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/item/view/$id',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminDetailPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminItemUpdateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/item/edit/$id',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminEditPage.tsx')),
  beforeLoad: requireAuth,
});

export const adminItemCreateRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/item/write',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminWritePage.tsx')),
  beforeLoad: requireAuth,
});
