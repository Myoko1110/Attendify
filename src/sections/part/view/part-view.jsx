import { useCookies } from 'react-cookie';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Card, Grid, Stack, Button, Container, Typography } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import Parts from 'src/utils/part';
import Attendances from 'src/utils/attendances';

import Chart from 'src/components/chart';
import Iconify from 'src/components/iconify';

import AttendanceRateChart from '../attendance-rate-chart';

export default function PartView() {
  const [cookies] = useCookies(['']);
  const [title, setTitle] = useState('');
  const [part, setPart] = useState(null);
  const [attendances, setAttendances] = useState(null);

  const [rateDates, setRateDates] = useState([]);
  const [rates, setRates] = useState([]);

  const theme = useTheme();

  const { partName } = useParams();
  const router = useRouter();

  useEffect(() => {
    if (!['Fl', 'Cl', 'Wr', 'Sax', 'Tp', 'Tb', 'Hr', 'Bass', 'Per'].includes(partName)) {
      setTitle('パートが無効です');
    } else {
      setTitle(partName);
      setPart(Parts.find((i) => i.en === partName));

      Attendances.byPart(partName, cookies)
        .then((r) => {
          setAttendances(r);
          const dr = [];
          const ar = [];

          const months = r.toObject();
          Object.keys(months).forEach((y) => {
            Object.keys(months[y]).forEach((m) => {
              const dl = months[y][m].toDateList();
              Object.keys(dl).forEach((d) => {
                const adc = dl[d];
                dr.push(`${y}-${m}-${d}`);
                ar.push(adc.rate);
              });
            });
          });

          console.log(dr);

          setRateDates(dr);
          setRates(ar);
        })
        .catch((e) => {
          console.log(e);
          setTitle('ユーザーが見つかりませんでした');
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <Stack direction="row" justifyContent="space-between" mb={5}>
        <Typography variant="h3">パート</Typography>
      </Stack>
      <Card sx={{ p: 3 }}>
        <Button onClick={() => router.replace('/parts')} color="inherit">
          <Stack direction="row" sx={{ width: 'fit-content' }}>
            <Iconify icon="bx:arrow-back" />
            <Typography variant="body2" sx={{ ml: 1 }}>
              戻る
            </Typography>
          </Stack>
        </Button>
        <Typography variant="h4" sx={{ my: 2 }}>
          {title}
        </Typography>
        {part && (
          <>
            {attendances && attendances.length !== 0 ? (
              <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={4}>
                  <Chart
                    dir="ltr"
                    type="radialBar"
                    series={[attendances.rate]}
                    options={{
                      colors: ['#2065D1'],
                      chart: {
                        toolbar: {
                          show: false,
                        },
                      },
                      fill: {
                        gradient: {
                          stops: [0, 100],
                          colorStops: [
                            [
                              {
                                offset: 0,
                                opacity: 1,
                                color: attendances.rate >= 80 ? '#76B0F1' : '#f5dfa9',
                              },
                              {
                                offset: 100,
                                color: attendances.rate >= 80 ? '#2065D1' : '#f2bb2e',
                                opacity: 1,
                              },
                            ],
                          ],
                        },
                        type: 'gradient',
                      },
                      stroke: {
                        width: 3,
                        curve: 'smooth',
                        lineCap: 'round',
                      },
                      plotOptions: {
                        radialBar: {
                          hollow: {
                            size: '68%',
                          },
                          dataLabels: {
                            name: {
                              color: theme.palette.grey[600],
                              ...theme.typography.body2,
                            },
                            value: {
                              ...theme.typography.h3,
                            },
                          },
                        },
                      },
                      labels: ['出席率'],
                    }}
                    height={350}
                  />
                  <Stack direction="row" alignItems="end" justifyContent="end" gap={1}>
                    <Typography variant="body2">実際の出席率</Typography>
                    <Typography variant="h5">{attendances.actualRate}%</Typography>
                  </Stack>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                  <AttendanceRateChart
                    chart={{
                      labels: rateDates,
                      series: [
                        {
                          name: '出席率',
                          data: rates,
                        },
                      ],
                    }}
                    partName={partName}
                  />
                </Grid>
              </Grid>
            ) : (
              <Typography variant="body2">データがありません</Typography>
            )}
          </>
        )}
      </Card>
    </Container>
  );
}
