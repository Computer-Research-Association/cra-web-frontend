import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck';

export const swaggerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/swagger',
  component: lazy(() => import('~/pages/Swagger/SwaggerPage.tsx')),
  beforeLoad: requireAuth,
});
