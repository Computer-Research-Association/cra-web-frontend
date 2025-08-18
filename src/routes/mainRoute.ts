// import { createRoute, redirect } from '@tanstack/react-router';
// import { lazy } from 'react';
// import { rootRoute } from './__root';
// import { useAuthStore } from '~/store/authStore';

// const requireAuth = () => {
//   const { isAuthenticated } = useAuthStore.getState();
//   if (!isAuthenticated) {
//     return redirect({ to: '/login' });
//   }
// };

// export const mainRoute = createRoute({
//   getParentRoute: () => rootRoute,
//   path: '/main',
//   component: lazy(() => import('~/pages/Main/MainPage.tsx')),
//   beforeLoad: requireAuth,
// });
