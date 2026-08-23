import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';

export const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register/info',
  component: lazy(() => import('~/pages/Register/RegisterPage.tsx')),
});

/*
// no longer used. 더이상 사용되지 않음.
export const registerInfoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register',
  component: lazy(() => import('~/pages/Register/RegisterInfoPage.tsx')),
});
*/

export const registerWelcomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/register/complete',
  component: lazy(() => import('~/pages/Register/RegisterCompletePage.tsx')),
});

export const privacyPolicyRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/privacy-policy',
  component: lazy(() => import('~/pages/Register/PrivacyPolicyPage.tsx')),
});
