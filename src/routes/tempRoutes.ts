import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';

export const comingSoonRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '*',
  component: lazy(() => import('~/pages/Temp/ComingSoonPage.tsx')),
});

export const WIPRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/updating',
  component: lazy(() => import('~/pages/Temp/WorkInProcess.tsx')),
});
