import {lazy, Suspense} from 'react';
import {Outlet, useRoutes} from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const IndexPage = lazy(() => import('src/pages/home'));
export const MembersPage = lazy(() => import('src/pages/members'));
export const SchedulePage = lazy(() => import('src/pages/schedule'));
export const PartsPage = lazy(() => import('src/pages/parts'));

export const FormPage = lazy(() => import('src/pages/form'));

export const LoginPage = lazy(() => import('src/pages/login'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

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
        { path: 'members', element: <MembersPage /> },
        { path: 'parts', element: <PartsPage /> },
        { path: 'schedule', element: <SchedulePage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'form',
      element: <FormPage />,
    },
    {
      path: '*',
      element: <Page404 />,
    },
  ]);
}

export default Router
