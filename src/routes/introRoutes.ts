/* eslint-disable */
import { createRoute } from '@tanstack/react-router';
import { lazy, useEffect } from 'react';
import { rootRoute } from './__root';
import { useNavigate } from 'react-router-dom';

export const HomeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/`,
  component: lazy(() => import('~/pages/Intro/IntroPage.tsx')),
});

export const introRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: `/intro`,
  component: () => {
    const navigate = useNavigate();

    useEffect(() => {
      void navigate('/');
    }, [navigate]);
  },
});
