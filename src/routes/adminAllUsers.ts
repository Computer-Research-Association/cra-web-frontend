import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { adminLayoutRoute } from './adminLayoutRoute';

export const adminAllUsers = createRoute({
  getParentRoute: () => adminLayoutRoute,
  path: '/admin/allusers',
  component: lazy(() => import('../components/User/UserList/UserList.tsx')),
});
