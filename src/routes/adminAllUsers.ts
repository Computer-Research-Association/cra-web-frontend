import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck.tsx';

export const adminAllUsers = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin/allusers',
  component: lazy(() => import('../components/User/UserList/UserList.tsx')),
  beforeLoad: requireAuth,
});
