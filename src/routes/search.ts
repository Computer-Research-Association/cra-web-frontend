import { createRoute } from '@tanstack/react-router';
import { rootRoute } from './__root';
import { lazy } from 'react';
import { requireAuth } from '~/components/Auth/Decode/authCheck';

export const search = createRoute({
  getParentRoute: () => rootRoute,
  path: '/search',
  component: lazy(() => import('~/pages/Search/SearchPage.tsx')),
  beforeLoad: requireAuth,
});
