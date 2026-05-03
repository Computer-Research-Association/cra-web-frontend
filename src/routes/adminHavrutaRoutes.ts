import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';


export const adminHavrutaRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/havruta',
  component: lazy(
    () => import('~/pages/Board/Havruta/HavrutaAdmin/HavrutaAdminPage.tsx'),
  ),

});

export const adminHavrutaUpdateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/havruta/edit/$id',
  component: lazy(
    () => import('~/pages/Board/Havruta/HavrutaAdmin/HavrutaAdminEditPage.tsx'),
  ),

});

export const adminHavrutaCreateRoute = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/havruta/write',
  component: lazy(
    () =>
      import('~/pages/Board/Havruta/HavrutaAdmin/HavrutaAdminWritePage.tsx'),
  ),

});
