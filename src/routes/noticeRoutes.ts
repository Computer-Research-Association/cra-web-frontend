import { createRoute } from '@tanstack/react-router';
import { lazy } from 'react';
import { rootRoute } from './__root';
import { requireAuth } from '~/components/Auth/Decode/authCheck';

export const noticeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notice',
  component: lazy(() => import('~/pages/Board/Notice/NoticePage.tsx')),
});

export const noticeViewRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notice/view/$id',
  component: lazy(() => import('~/pages/Board/Notice/NoticeDetailPage.tsx')),
});

export const noticeEditRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/notice/edit/$id',
  component: lazy(() => import('~/pages/Board/Notice/NoticeEditPage.tsx')),
});

export const adminNoticeWriteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: 'admin/notice/write',
  component: lazy(() => import('~/pages/Board/Notice/NoticeWritePage.tsx')),
  beforeLoad: requireAuth,
});
