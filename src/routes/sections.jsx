import { lazy, Suspense } from 'react';
import { Outlet, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/home'));
export const AttendancePage = lazy(() => import('src/pages/attendance'));
export const MembersPage = lazy(() => import('src/pages/members'));
export const MemberPage = lazy(() => import('src/pages/member'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const PartsPage = lazy(() => import('src/pages/parts'));
export const PartPage = lazy(() => import('src/pages/part'));
export const GradePage = lazy(() => import('src/pages/grade'));

export const FormPage = lazy(() => import('src/pages/form'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const Page500 = lazy(() => import('src/pages/server-error'));

// ----------------------------------------------------------------------

function Router() {
  return useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'attendance', element: <AttendancePage /> },
        { path: 'members', element: <MembersPage /> },
        { path: 'members/:id', element: <MemberPage /> },
        { path: 'parts', element: <PartsPage /> },
        { path: 'parts/:partName', element: <PartPage /> },
        { path: 'schedule', element: <SchedulePage /> },
        { path: 'grade/:g', element: <GradePage /> },
      ],
      errorElement: <Page500 />,
    },
    {
      path: 'login',
      element: <LoginPage />,
      errorElement: <Page500 />,
    },
    {
      path: 'form',
      element: <FormPage />,
      errorElement: <Page500 />,
    },
    {
      path: '500',
      element: <Page500 />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
}

export default Router;
