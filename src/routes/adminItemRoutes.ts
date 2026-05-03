import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';


export const adminItemRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/item',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminPage.tsx')),

});

export const adminItemDetailRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/item/view/$id',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminDetailPage.tsx')),

});

export const adminItemUpdateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/item/edit/$id',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminEditPage.tsx')),

});

export const adminItemCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/item/write',
  component: lazy(() => import('~/pages/Board/Item/ItemAdminWritePage.tsx')),

});
