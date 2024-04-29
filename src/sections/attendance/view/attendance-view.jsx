import { useCookies } from 'react-cookie';
import { useTheme } from '@emotion/react';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Accordion, AccordionDetails, AccordionSummary } from '@mui/material';

import { useResponsive } from 'src/hooks/use-responsive';

import Attendances from 'src/utils/attendances';

import Iconify from 'src/components/iconify';

import Snackbars from '../snackbers';
import AttendanceDates from '../attendance-dates';

// ----------------------------------------------------------------------

export default function AttendanceView() {
  const theme = useTheme();
  const [cookies] = useCookies();
  const [attendances, setAttendances] = useState({});
  const lgUp = useResponsive('up', 'lg');

  const [deleteSuccessOpen, setDeleteSuccessOpen] = useState(false);
  const [deleteErrorOpen, setDeleteErrorOpen] = useState(false);
  const [editSuccessOpen, setEditSuccessOpen] = useState(false);
  const [editErrorOpen, setEditErrorOpen] = useState(false);

  useEffect(() => {
    updateAttendances();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateAttendances = async () => {
    await Attendances.all(cookies).then((res) => {
      setAttendances(res.toObject());
    });
  };

  return (
    <Container>
      <Typography variant="h3" sx={{ mb: 5 }}>
        出欠
      </Typography>

      <Card>
        {attendances && (
          <Stack direction="column" spacing={4}>
            {Object.keys(attendances)
              .reverse()
              .map((y, i) => (
                <Box key={i}>
                  <Box bgcolor={theme.palette.grey[300]} sx={{ px: 2, py: 1 }}>
                    <Typography variant="body2" textAlign="center">
                      {y}年
                    </Typography>
                  </Box>
                  {Object.keys(attendances[y])
                    .reverse()
                    .map((m, j) => {
                      const { rate, actualRate } = attendances[y][m];
                      return (
                        <Accordion
                          key={j}
                          {...(i === 0 &&
                            j === 0 && {
                              defaultExpanded: true,
                            })}
                        >
                          <AccordionSummary
                            sx={{
                              px: 2,
                              backgroundColor: theme.palette.grey[200],
                              '&:hover': { backgroundColor: theme.palette.grey[300] },
                            }}
                            expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}
                          >
                            <Stack
                              direction="row"
                              alignItems="center"
                              justifyContent="space-between"
                              sx={{ width: '100%', px: 4 }}
                            >
                              <Typography variant="h4">{m}月</Typography>
                              <Stack direction="row" alignItems="center" gap={1}>
                                {rate ? (
                                  <>
                                    <LinearProgress
                                      variant="determinate"
                                      value={rate}
                                      sx={{
                                        height: '10px',
                                        borderRadius: '100px',
                                        ...(lgUp
                                          ? {
                                              width: 150,
                                            }
                                          : {
                                              width: 100,
                                            }),
                                        ...(rate >= 80
                                          ? {
                                              backgroundColor: 'success.lighter',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: 'success.main',
                                              },
                                            }
                                          : {
                                              backgroundColor: 'warning.lighter',
                                              '& .MuiLinearProgress-bar': {
                                                backgroundColor: 'warning.main',
                                              },
                                            }),
                                      }}
                                    />
                                    <Stack direction="row" gap={1}>
                                      <Typography variant="subtitle2" width={70} textAlign="right">
                                        {rate.toFixed(2)}%
                                      </Typography>
                                      <Typography variant="body2" width={60}>
                                        ({actualRate.toFixed(2)}%)
                                      </Typography>
                                    </Stack>
                                  </>
                                ) : (
                                  <Typography variant="body2">データなし</Typography>
                                )}
                              </Stack>
                            </Stack>
                          </AccordionSummary>
                          <AccordionDetails sx={{ px: 4 }}>
                            <AttendanceDates
                              attendances={attendances[y][m]}
                              setDeleteSuccessOpen={setDeleteSuccessOpen}
                              setDeleteErrorOpen={setDeleteErrorOpen}
                              setEditSuccessOpen={setEditSuccessOpen}
                              setEditErrorOpen={setEditErrorOpen}
                            />
                          </AccordionDetails>
                        </Accordion>
                      );
                    })}
                </Box>
              ))}
          </Stack>
        )}
      </Card>
      <Snackbars
        deleteSuccessOpen={deleteSuccessOpen}
        deleteErrorOpen={deleteErrorOpen}
        editSuccessOpen={editSuccessOpen}
        editErrorOpen={editErrorOpen}
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
        setEditSuccessOpen={setEditSuccessOpen}
        setEditErrorOpen={setEditErrorOpen}
      />
    </Container>
  );
}
