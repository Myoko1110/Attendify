import axios from 'axios';
import dayjs from 'dayjs';
import { useCookies } from 'react-cookie';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { Step, Alert, Stepper, StepLabel } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

import Logo from 'src/components/logo';

import FormSuccess from '../form-success';
import DatePartSelect from '../date-part-select';
import Iconify from '../../../components/iconify';
import AttendanceSelect from '../attendance-selects';
import { checkSession } from '../../../utils/session';

// ----------------------------------------------------------------------

export default function FormView() {
  const router = useRouter();

  const [cookies] = useCookies(['']);
  const backToDashboardRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(false);

  const [date, setDate] = useState('');
  const [part, setPart] = useState('');
  const [grade, setGrade] = useState(null);

  const [attendances, setAttendances] = useState({});
  const [isSuccess, setIsSuccess] = useState(null);

  const lgUp = useResponsive('up', 'lg');

  useEffect(() => {
    if (cookies.session && cookies.userId) {
      const { session, userId } = cookies;

      const [status, type] = checkSession(userId, session);
      if (!status) {
        router.replace('/login');
      }
      setIsReady(true);

      if (type === 'executive') {
        backToDashboardRef.current = (
          <Link
            href="/"
            sx={{
              color: 'initial',
              textDecoration: 'none',
              display: 'block',
              width: 'fit-content',
              px: 1.5,
              py: 0.5,
              mb: 1,
              borderRadius: 1,
              '&:hover': {
                backgroundColor: 'rgba(100, 100, 100, .1)',
              },
            }}
            alignItems="center"
          >
            <Stack direction="row" sx={{ width: 'fit-content' }}>
              <Iconify icon="bx:arrow-back" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ダッシュボードへ戻る
              </Typography>
            </Stack>
          </Link>
        );
      }
    } else {
      router.replace('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (!(date && part && grade)) {
      setError(true);
      window.scrollTo(0, 0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setError(null);
    }
  };
  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    setError(null);
  };

  const handleSend = () => {
    let hasError = false;

    Object.keys(attendances).forEach((email) => {
      if (!attendances[email]) {
        setError(true);
        hasError = true;
      }
    });

    if (!hasError) {
      setError(false);
      const { session, userId } = cookies;

      axios
        .post('http://localhost:8000/api/v1/attendance/', {
          attendances,
          part,
          grade,
          date: dayjs(date).unix(),
          userId: userId.replace('_', ''),
          token: session,
        })
        .then(() => {
          setIsSuccess(true);
        })
        .catch(() => {
          setIsSuccess(false);
        });
    }
  };

  const theme = useTheme();

  return (
    <>
      {isReady && (
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
              zIndex: 2,
            }}
          />

          <Stack
            alignItems="center"
            justifyContent="start"
            sx={{
              height: 1,
              p: 1,
            }}
          >
            <Container
              sx={{
                maxWidth: { xm: 800, sm: 800 },
                mt: 10,
                px: 1,
                pb: 1,
              }}
            >
              {backToDashboardRef.current}
              <Card
                sx={{
                  ...(lgUp
                    ? {
                        p: 5,
                      }
                    : {
                        p: 3,
                      }),
                }}
              >
                <Typography variant="h3" sx={{ fontSize: '2rem!important' }}>
                  出欠フォーム
                </Typography>

                {isSuccess === null ? (
                  <>
                    <Typography variant="body2" sx={{ color: 'initial', mt: 2 }}>
                      パートの代表者は部活動があった日の出欠を入力してください。
                      <br />
                      間違えた回答を送信してしまった場合は、もう一度正しい回答を送信してください。
                    </Typography>

                    <Stepper
                      alternativeLabel
                      activeStep={activeStep}
                      sx={{
                        mt: 4,
                        '& .MuiStepLabel-label': {
                          fontWeight: '400!important',
                          mt: '8px!important',
                        },
                      }}
                    >
                      <Step key="1">
                        <StepLabel>日付・パート</StepLabel>
                      </Step>
                      <Step key="2">
                        <StepLabel>出欠情報</StepLabel>
                      </Step>
                    </Stepper>

                    {activeStep === 0 ? (
                      <>
                        {error && (
                          <Alert severity="error" sx={{ mt: 6 }}>
                            未選択の項目があります。
                          </Alert>
                        )}
                        <DatePartSelect
                          date={date}
                          part={part}
                          grade={grade}
                          setDate={setDate}
                          setPart={setPart}
                          setGrade={setGrade}
                        />

                        <Stack direction="row" justifyContent="end">
                          <Button variant="contained" onClick={handleNext}>
                            次へ
                          </Button>
                        </Stack>
                      </>
                    ) : (
                      <AttendanceSelect
                        date={date}
                        part={part}
                        grade={grade}
                        setAttendances={setAttendances}
                        handlePrev={handlePrev}
                        handleSend={handleSend}
                        error={error}
                      />
                    )}
                  </>
                ) : (
                  <FormSuccess isSuccess={isSuccess} />
                )}
              </Card>
            </Container>
          </Stack>
        </Box>
      )}
    </>
  );
}
