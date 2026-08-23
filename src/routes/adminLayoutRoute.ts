import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminLayoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'adminLayout',
  component: lazy(() => import('~/components/Admin/AdminLayout.tsx')),
  beforeLoad: requireAuth,
});
