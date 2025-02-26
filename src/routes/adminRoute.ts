import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: lazy(() => import('~/pages/Admin/AdminPage.tsx')),
  beforeLoad: requireAuth,
});
