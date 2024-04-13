import {useCookies} from "react-cookie";
import {useRef, useState, useEffect} from "react";

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Link from "@mui/material/Link";
import Stack from '@mui/material/Stack';
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Typography from '@mui/material/Typography';
import {alpha, useTheme} from '@mui/material/styles';
import { Step, Alert, Stepper, StepLabel } from '@mui/material';

import {useRouter} from 'src/routes/hooks';

import {bgGradient} from 'src/theme/css';

import Logo from 'src/components/logo';

import DatePartSelect from "../date-part-select";
import Iconify from "../../../components/iconify";
import {checkSession} from "../../../utils/session";
import AttendanceSelect from "../attendance-inputs";

// ----------------------------------------------------------------------

export default function FormView() {
  const router = useRouter();

  const [cookies,] = useCookies(["status", ""]);
  const backToDashboardRef = useRef(null);

  const [isReady, setIsReady] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [error, setError] = useState(null);

  const [date, setDate] = useState("");
  const [part, setPart] = useState("");
  const [grade, setGrade] = useState(null);

  // const [attendances, setAttendances] = useState([]);

  useEffect(() => {
    if (cookies.session && cookies.userId) {
      const {session, userId} = cookies;

      const [status, type] = checkSession(userId, session);
      if (!status) {
        router.replace("/login");
      }
      setIsReady(true);

      if (type === "executive") {
        backToDashboardRef.current = (
          <Link href="/" sx={{
            color: "initial",
            textDecoration: "none",
            display: "block",
            width: "fit-content",
            px: 1.5,
            py: .5,
            mb: 1,
            borderRadius: 1,
            '&:hover': {
              backgroundColor: "rgba(100, 100, 100, .1)"
            }
          }} alignItems="center">
            <Stack direction="row" sx={{width: "fit-content",}}>
              <Iconify icon="bx:arrow-back" />
              <Typography variant="body2" sx={{ ml: 1 }}>
                ダッシュボードへ戻る
              </Typography>
            </Stack>
          </Link>
        );
      }

    } else {
      router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = () => {
    if (!(date && part && grade)) {
      setError(
        <Alert severity="error" sx={{mt: 6}}>
          未選択の項目があります。
        </Alert>
      );
      window.scrollTo(0, 0);
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
      setError(null);
    }
  };
  const handlePrev = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
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
              top: {xs: 16, md: 24},
              left: {xs: 16, md: 24},
              zIndex: 2,
            }}
          />

          <Stack alignItems="center" justifyContent="start" sx={{height: 1, p: 1}}>
            <Container
              sx={{
                maxWidth: {xm: 800, sm: 800},
                mt: 10,
                px: 1,
                pb: 1,
              }}
            >
              {backToDashboardRef.current}
              <Card sx={{p: 5}}>

                <Typography variant="h3" sx={{fontSize: "2rem!important"}}>出欠フォーム</Typography>

                <Typography variant="body2" sx={{color: "initial", mt: 2}}>
                  パートの代表者は部活動があった日の出欠を入力してください。<br />
                  間違えた回答を送信してしまった場合は、もう一度正しい回答を送信してください。
                </Typography>

                <Stepper
                  alternativeLabel
                  activeStep={activeStep}
                  sx={{
                  mt: 4,
                  '& .MuiStepLabel-label': {
                    fontWeight: "400!important",
                    mt: "8px!important",
                  },
                }}>
                  <Step key="1">
                    <StepLabel>日付・パート</StepLabel>
                  </Step>
                  <Step key="2">
                    <StepLabel>出欠情報</StepLabel>
                  </Step>
                </Stepper>

                {error}

                {activeStep === 0 ? (
                  <>

                    <DatePartSelect
                      date={date}
                      part={part}
                      grade={grade}
                      setDate={setDate}
                      setPart={setPart}
                      setGrade={setGrade}
                    />

                    <Stack direction="row" justifyContent="end">
                      <Button variant="contained" onClick={handleNext}>次へ</Button>
                    </Stack>
                  </>
                ) : (
                  <>
                    <Alert severity="info" sx={{mt: 6}}>
                      委員会・係などで来れなかった場合、講習で遅刻した場合でも
                      <Box sx={{
                      backgroundColor: "#ffffff",
                      px: 1,
                      color: "#212B36",
                      width: "fit-content",
                      display: "inline-block",
                      mx: .5,
                      border: "1px solid #e3e3e3",
                      borderRadius: "4px",
                    }}>
                        講習
                      </Box>
                      を選択してください。
                    </Alert>

                    <AttendanceSelect part={part} grade={grade} />

                    <Stack direction="row" justifyContent="end">
                      <Button variant="outlined" onClick={handlePrev} sx={{mr: 1}}>戻る</Button>
                      <Button variant="contained" onClick={handleNext}>送信</Button>
                    </Stack>
                  </>
                )}

              </Card>
            </Container>
          </Stack>
        </Box>
      )}
    </>
  );
}
