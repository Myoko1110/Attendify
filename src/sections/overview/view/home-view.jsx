import { faker } from '@faker-js/faker';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import Attendances from 'src/utils/attendances';

import { grey, error, success, warning } from 'src/theme/palette';

import Iconify from 'src/components/iconify';

import AppTasks from '../app-tasks';
import AppNewsUpdate from '../app-news-update';
import AttendanceChart from '../attendance-chart';
import AppOrderTimeline from '../app-order-timeline';
import AppTrafficBySite from '../app-traffic-by-site';
import RateWidgetSummary from '../rate-widget-summary';
import AppCurrentSubject from '../app-current-subject';
import AppConversionRates from '../app-conversion-rates';
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
        <Grid xs={12} sm={6} md={4}>
          <RateWidgetSummary
            title="今日の出席率"
            value={allAttendances.today.rate}
            color="warning"
            rate={100}
          />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <RateWidgetSummary title="全体の出席率" value={allAttendances.rate} color="success" />
        </Grid>

        <Grid xs={12} sm={6} md={4}>
          <RateWidgetSummary
            title="今月の出席率"
            value={allAttendances.thisMonth.rate}
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

        <Grid xs={12} md={6} lg={8}>
          <AppConversionRates
            title="Conversion Rates"
            subheader="(+43%) than last year"
            chart={{
              series: [
                { label: 'Italy', value: 400 },
                { label: 'Japan', value: 430 },
                { label: 'China', value: 448 },
                { label: 'Canada', value: 470 },
                { label: 'France', value: 540 },
                { label: 'Germany', value: 580 },
                { label: 'South Korea', value: 690 },
                { label: 'Netherlands', value: 1100 },
                { label: 'United States', value: 1200 },
                { label: 'United Kingdom', value: 1380 },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppCurrentSubject
            title="Current Subject"
            chart={{
              categories: ['English', 'History', 'Physics', 'Geography', 'Chinese', 'Math'],
              series: [
                { name: 'Series 1', data: [80, 50, 30, 40, 100, 20] },
                { name: 'Series 2', data: [20, 30, 40, 80, 20, 80] },
                { name: 'Series 3', data: [44, 76, 78, 13, 43, 10] },
              ],
            }}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppNewsUpdate
            title="News Update"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: faker.person.jobTitle(),
              description: faker.commerce.productDescription(),
              image: `/assets/images/covers/cover_${index + 1}.jpg`,
              postedAt: faker.date.recent(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppOrderTimeline
            title="Order Timeline"
            list={[...Array(5)].map((_, index) => ({
              id: faker.string.uuid(),
              title: [
                '1983, orders, $4220',
                '12 Invoices have been paid',
                'Order #37745 from September',
                'New order placed #XF-2356',
                'New order placed #XF-2346',
              ][index],
              type: `order${index + 1}`,
              time: faker.date.past(),
            }))}
          />
        </Grid>

        <Grid xs={12} md={6} lg={4}>
          <AppTrafficBySite
            title="Traffic by Site"
            list={[
              {
                name: 'FaceBook',
                value: 323234,
                icon: <Iconify icon="eva:facebook-fill" color="#1877F2" width={32} />,
              },
              {
                name: 'Google',
                value: 341212,
                icon: <Iconify icon="eva:google-fill" color="#DF3E30" width={32} />,
              },
              {
                name: 'Linkedin',
                value: 411213,
                icon: <Iconify icon="eva:linkedin-fill" color="#006097" width={32} />,
              },
              {
                name: 'Twitter',
                value: 443232,
                icon: <Iconify icon="eva:twitter-fill" color="#1C9CEA" width={32} />,
              },
            ]}
          />
        </Grid>

        <Grid xs={12} md={6} lg={8}>
          <AppTasks
            title="Tasks"
            list={[
              { id: '1', name: 'Create FireStone Logo' },
              { id: '2', name: 'Add SCSS and JS files if required' },
              { id: '3', name: 'Stakeholder Meeting' },
              { id: '4', name: 'Scoping & Estimations' },
              { id: '5', name: 'Sprint Showcase' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
