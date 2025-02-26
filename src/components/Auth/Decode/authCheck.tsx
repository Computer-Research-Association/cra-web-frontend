import { redirect } from '@tanstack/react-router';
import { useAuthStore } from '~/store/authStore';
import isAdmin from './adminCheck.tsx';

export const requireAuth = () => {
  const { isAuthenticated, accessToken } = useAuthStore.getState();
  const token = accessToken as string;
  console.log(token);
  if (!isAuthenticated) {
    return redirect({ to: '/forbidden' });
  }
  if (!token) {
    return redirect({ to: '/forbidden' });
  }
  const userIsAdmin = isAdmin(token);
  if (!userIsAdmin) {
    return redirect({ to: '/forbidden' });
  } else {
    console.log('환영합니다');
  }
};
