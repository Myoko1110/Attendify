import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useRouter } from 'src/routes/hooks';

import instance from 'src/utils/api';
import { checkSession } from 'src/utils/session';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const googleRedirectUrl = import.meta.env.VITE_GOOGLE_REDIRECT_URL;
const googleScope = import.meta.env.VITE_GOOGLE_SCOPE;

export default function LoginView() {
  const router = useRouter();
  const { search } = useLocation();

  const [errorMessage, setErrorMessage] = useState('');
  const [cookies, setCookie] = useCookies(['status', '']);

  useEffect(() => {
    if (cookies.session && cookies.userId) {
      checkSession(cookies).then((sessionType) => {
        if (sessionType === 'executive') {
          router.replace('/');
        } else {
          router.replace('/form');
        }
      });
    }

    const code = new URLSearchParams(search).get('code');
    if (code) {
      instance
        .post('/api/v1/auth/login/', { code })
        .then((response) => {
          setCookie('session', response.data.token, { maxAge: 60 * 60 * 24 * 30 * 6, path: '/' });
          setCookie('userId', `_${response.data.user.id.toString()}`, {
            maxAge: 60 * 60 * 24 * 30 * 6,
            path: '/',
          });

          router.replace('/');
        })
        .catch((error) => {
          if (error.response.status === 403) {
            setErrorMessage('アクセス権がありません');
          } else {
            console.error('Error occurred:', error);
          }
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const theme = useTheme();
  const oauth2Url = `https://accounts.google.com/o/oauth2/auth?client_id=${googleClientId}&redirect_uri=${googleRedirectUrl}&scope=${googleScope}&access_type=offline&response_type=code`;

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.background.default, 0.9),
          imgUrl: '/assets/background/overlay_4.jpg',
        }),
        height: 1,
      }}
    >
      <Logo
        disabledLink
        sx={{
          position: 'fixed',
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
        }}
      />

      <Stack alignItems="center" justifyContent="center" sx={{ height: 1, p: 1 }}>
        <Card
          sx={{
            p: 5,
            width: 1,
            maxWidth: 420,
          }}
        >
          <Typography variant="h4">ログイン</Typography>

          <Typography
            variant="body2"
            sx={{ color: errorMessage ? 'error.main' : 'initial', mt: 2 }}
          >
            {errorMessage || '学校のアカウントを用いてログインしてください'}
          </Typography>

          <Link href={oauth2Url}>
            <Button
              fullWidth
              size="large"
              color="inherit"
              variant="outlined"
              sx={{ borderColor: alpha(theme.palette.grey[500], 0.16), my: 3 }}
            >
              <Iconify icon="devicon:google" color="#DF3E30" />
              <Typography variant="body2" sx={{ ml: 2, color: 'grey.800' }}>
                Googleでログイン
              </Typography>
            </Button>
          </Link>
        </Card>
      </Stack>
    </Box>
  );
}
