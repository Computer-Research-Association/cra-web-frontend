//------------------------------배포용 route------------------------------------
// import { createRouter } from '@tanstack/react-router';
// import { rootRoute } from './__root.tsx';
// import { HomeRoute, introRoute } from './introRoutes.ts';
// import { recruitRoute } from './recruitRoute.ts';
// import { comingSoonRoute } from './tempRoutes.ts';

// export const routes = createRouter({
//   routeTree: rootRoute.addChildren([
//     HomeRoute,
//     introRoute,
//     recruitRoute,
//     comingSoonRoute,
//   ]),
// });
//-------------------------------------------------------------------------------

import { createRouter } from '@tanstack/react-router';
import { rootRoute } from './__root.tsx';
import {
  notRouteRoute,
  notFoundRoute,
  forbiddenRoute,
  serverErrorRoute,
} from './errorRoute.ts';
import { HomeRoute, introRoute } from './introRoutes.ts';
import { recruitRoute } from './recruitRoute.ts';
import { mainRoute } from './mainRoute.ts';
import { loginRoute } from './loginRoute.ts';
import {
  registerRoute,
  registerWelcomeRoute,
  registerInfoRoute,
  privacyPolicyRoute,
} from './registerRoutes.ts';
import {
  idSerachRoute,
  idCompleteRoute,
  pwSearchRoute,
  pwResetRoute,
  pwCompleteRoute,
} from './authRoutes.ts';
import {
  noticeRoute,
  noticeViewRoute,
  noticeEditRoute,
  adminNoticeWriteRoute,
} from './noticeRoutes.ts';
import {
  academicRoute,
  academicViewRoute,
  academicEditRoute,
  academicWriteRoute,
} from './academicRoutes.ts';
import { bookRoute } from './bookRoute.ts';
import { itemRoute } from './itemRoute.ts';
import { projectRoute } from './projectRoute.ts';
import {
  havrutaRoute,
  havrutaViewRoute,
  havrutaEditRoute,
  havrutaWriteRoute,
} from './havrutaRoutes.ts';
import { adminRoute, superAdminRoute } from './adminRoute.ts';
import { adminAllUsers } from './adminAllUsers.ts';
import {
  adminBookRoute,
  adminBookDetailRoute,
  adminBookUpdateRoute,
  adminBookCreateRoute,
} from './adminBookRoutes.ts';
import {
  adminItemRoute,
  adminItemDetailRoute,
  adminItemUpdateRoute,
  adminItemCreateRoute,
} from './adminItemRoutes.ts';
import {
  adminHavrutaRoute,
  adminHavrutaUpdateRoute,
  adminHavrutaCreateRoute,
} from './adminHavrutaRoutes.ts';
import {
  adminProjectRoute,
  adminProjectDetailRoute,
  adminProjectUpdateRoute,
  adminProjectCreateRoute,
} from './adminProjectRoutes.ts';
import {
  userInfoRoute,
  userEditRoute,
  userDeleteRoute,
  userImageRoute,
} from './userRoutes.ts';
// import { comingSoonRoute, WIPRoute } from './tempRoutes.ts';
import { swaggerRoute } from './swaggerRoutes.ts';
import { search } from './search.ts';

export const routes = createRouter({
  routeTree: rootRoute.addChildren([
    notRouteRoute,
    notFoundRoute,
    forbiddenRoute,
    serverErrorRoute,
    HomeRoute,
    introRoute,
    recruitRoute,
    mainRoute,
    loginRoute,
    registerRoute,
    registerWelcomeRoute,
    registerInfoRoute,
    privacyPolicyRoute,
    idSerachRoute,
    idCompleteRoute,
    pwSearchRoute,
    pwResetRoute,
    pwCompleteRoute,
    noticeRoute,
    noticeViewRoute,
    noticeEditRoute,
    adminNoticeWriteRoute,
    academicRoute,
    academicViewRoute,
    academicEditRoute,
    academicWriteRoute,
    bookRoute,
    itemRoute,
    projectRoute,
    havrutaRoute,
    havrutaViewRoute,
    havrutaEditRoute,
    havrutaWriteRoute,
    adminRoute,
    superAdminRoute,
    adminAllUsers,
    adminBookRoute,
    adminBookDetailRoute,
    adminBookUpdateRoute,
    adminBookCreateRoute,
    adminItemRoute,
    adminItemDetailRoute,
    adminItemUpdateRoute,
    adminItemCreateRoute,
    adminHavrutaRoute,
    adminHavrutaUpdateRoute,
    adminHavrutaCreateRoute,
    adminProjectRoute,
    adminProjectDetailRoute,
    adminProjectUpdateRoute,
    adminProjectCreateRoute,
    userEditRoute,
    userInfoRoute,
    userDeleteRoute,
    userImageRoute,
    swaggerRoute,
    search,
    // comingSoonRoute,
    // WIPRoute,
  ]),
});
