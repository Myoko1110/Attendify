import { Link } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import { Stack, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Attendances from 'src/utils/attendances';

import { grey, error, success, warning } from 'src/theme/palette';

import AttendanceChart from '../attendance-chart';
import RateWidgetSummary from '../rate-widget-summary';
import AttendanceRateChart from '../attendance-rate-chart';

// ----------------------------------------------------------------------

export default function HomeView() {
  const [cookies] = useCookies(['']);

  const [allAttendances, setAllAttendances] = useState(new Attendances());

  const [dates, setDates] = useState([]);
  const [attendanceCount, setAttendanceCount] = useState([]);
  const [absenceCount, setAbsenceCount] = useState([]);
  const [tardinessCount, setTardinessCount] = useState([]);
  const [earlyDepartureCount, setEarlyDepartureCount] = useState([]);
  const [othersCount, setOthersCount] = useState([]);

  const [rateDates, setRateDates] = useState([]);
  const [attendanceRates, setAttendanceRates] = useState([]);

  useEffect(() => {
    Attendances.all(cookies).then((res) => {
      setAllAttendances(res);

      const now = new Date();

      const datesC = [];
      const attendanceC = [];
      const absenceC = [];
      const tardinessC = [];
      const earlyDepartureC = [];
      const othersC = [];
      for (let i = 0; i < 30; i += 1) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);

        const dateAttendance = res.byDate(d);
        if (dateAttendance.length !== 0) {
          datesC.push(d.getTime());

          attendanceC.push(dateAttendance.attendanceCount);
          absenceC.push(dateAttendance.absenceCount);
          tardinessC.push(dateAttendance.tardinessCount);
          earlyDepartureC.push(dateAttendance.earlyDepartureCount);
          othersC.push(dateAttendance.othersCount);
        }
      }

      setDates(datesC);
      setAttendanceCount(attendanceC);
      setAbsenceCount(absenceC);
      setTardinessCount(tardinessC);
      setEarlyDepartureCount(earlyDepartureC);
      setOthersCount(othersC);

      const dr = [];
      const ar = [];
      for (let i = 0; i < 30; i += 1) {
        const d = new Date(now);
        d.setDate(d.getDate() - i);

        const dateAttendance = res.byDate(d);
        if (dateAttendance.length !== 0) {
          dr.push(d.getTime());
          ar.push(dateAttendance.rate);
        }
      }

      setRateDates(dr);
      setAttendanceRates(ar);
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 5 }}>
        ホーム
      </Typography>

      <Grid container spacing={3}>
        <Grid xs={12} sm={12} md={4}>
          <RateWidgetSummary
            title="今日の出席率"
            value={allAttendances.today.rate}
            subValue={allAttendances.today.actualRate}
            color="warning"
            rate={100}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <RateWidgetSummary
            title="全体の出席率"
            value={allAttendances.rate}
            subValue={allAttendances.actualRate}
            color="success"
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <RateWidgetSummary
            title="今月の出席率"
            value={allAttendances.thisMonth.rate}
            subValue={allAttendances.thisMonth.actualRate}
            color="info"
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AttendanceChart
            title="出欠の内訳"
            chart={{
              labels: dates,
              series: [
                {
                  name: '出席',
                  type: 'column',
                  fill: 'solid',
                  data: attendanceCount,
                  color: success.main,
                },
                {
                  name: '欠席',
                  type: 'column',
                  fill: 'solid',
                  data: absenceCount,
                  color: error.main,
                },
                {
                  name: '遅刻',
                  type: 'column',
                  fill: 'solid',
                  data: tardinessCount,
                  color: warning.main,
                },
                {
                  name: '早退',
                  type: 'column',
                  fill: 'solid',
                  data: earlyDepartureCount,
                  color: warning.main,
                },
                {
                  name: 'その他',
                  type: 'column',
                  fill: 'solid',
                  data: othersCount,
                  color: grey[500],
                },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={6}>
          <AttendanceRateChart
            title="出席率の推移"
            chart={{
              labels: rateDates,
              series: [
                {
                  name: '出席率',
                  data: attendanceRates,
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Stack direction="row" justifyContent="end">
        <Link to="https://github.com/Myoko1110/Attendify">
          <Button color="inherit">Source Code</Button>
        </Link>
      </Stack>
    </Container>
  );
}
