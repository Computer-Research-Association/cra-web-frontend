// import { createRoute, redirect } from '@tanstack/react-router';
import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
// import { useAuthStore } from '~/store/authStore';

// const requireAuth = () => {
//   const { isAuthenticated } = useAuthStore.getState();
//   if (!isAuthenticated) {
//     return redirect({ to: '/login' });
//   }
// };

export const projectRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/project',
  component: lazy(() => import('~/pages/Board/Project/ProjectPage.tsx')),
  // beforeLoad: requireAuth,
});
