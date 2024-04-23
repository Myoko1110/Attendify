import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';

import Nav from './nav';
import Main from './main';
import Header from './header';
import { useRouter } from '../../routes/hooks';
import { checkSession } from '../../utils/session';
import { useResponsive } from '../../hooks/use-responsive';

// ----------------------------------------------------------------------

export default function DashboardLayout({ children }) {
  const [openNav, setOpenNav] = useState(false);
  const lgUp = useResponsive('up', 'lg');
  const router = useRouter();

  const [cookies] = useCookies(['']);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (cookies.session && cookies.userId) {
      checkSession(cookies)
        .then(sessionType => {
          if (sessionType === 'executive') {
            setIsReady(true);
          } else if (sessionType === 'normal') {
            router.replace('/form');
          } else {
            router.replace('/login');
          }
        })
        .catch(() => {
          router.replace('/500');
        });

    } else {
      router.replace('/login');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {isReady && (
        <>
          {!lgUp && (
            <Header onOpenNav={() => setOpenNav(true)} />
          )}

          <Box
            sx={{
              minHeight: 1,
              display: 'flex',
              flexDirection: { xs: 'column', lg: 'row' },
            }}
          >
            <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />

            <Main>{children}</Main>
          </Box>
        </>
      )}

    </>
  );
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
};
