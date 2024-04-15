import axios from 'axios';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { useCookies } from 'react-cookie';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Stack, Alert, Button, Typography } from '@mui/material';

import Iconify from 'src/components/iconify';

import { getMembers } from '../../_mock/user';
import AttendanceMemberSelect from './attendance-attendance-select';

export default function AttendanceSelect({
  date,
  part,
  grade,
  setAttendances,
  handlePrev,
  handleSend,
  error,
}) {
  const [cookies] = useCookies(['status', '']);

  const [members] = useState(getMembers(cookies.userId, cookies.session, part, grade));
  const [isExists, setIsExists] = useState(null);

  useEffect(() => {
    const { session, userId } = cookies;

    axios
      .get('http://localhost:8000/api/v1/attendance/response/', {
        params: {
          date: dayjs(date).unix(),
          part,
          grade,
          userId: userId.replace('_', ''),
          token: session,
        },
      })
      .then((response) => {
        setIsExists(response.data.responseExists);
      })
      .catch(() => {
        setIsExists(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFix = () => {
    setIsExists(false);
  };

  return (
    <>
      {!isExists ? (
        <>
          {error ? (
            <Alert severity="error" sx={{ mt: 6 }}>
              未選択の項目があります。
            </Alert>
          ) : (
            <Alert severity="info" sx={{ mt: 6 }}>
              委員会・係などで来れなかった場合、講習で遅刻した場合でも
              <Box
                sx={{
                  backgroundColor: '#ffffff',
                  px: 1,
                  color: '#212B36',
                  width: 'fit-content',
                  display: 'inline-block',
                  mx: 0.5,
                  border: '1px solid #e3e3e3',
                  borderRadius: '4px',
                }}
              >
                講習
              </Box>
              を選択してください。
            </Alert>
          )}
          <Box sx={{ mx: 'auto', mt: 2 }}>
            {members.map((row) => (
              <AttendanceMemberSelect
                id={row.id}
                lastName={row.lastName}
                firstName={row.firstName}
                setAttendances={setAttendances}
                key={row.id}
              />
            ))}
          </Box>
          <Stack direction="row" justifyContent="end" gap={1}>
            <Button variant="outlined" onClick={handlePrev}>
              戻る
            </Button>
            <Button variant="contained" onClick={handleSend}>
              送信
            </Button>
          </Stack>
        </>
      ) : (
        <Stack direction="column" alignItems="center" justifyContent="center" sx={{ mt: 2 }}>
          <Iconify icon="eva:info-fill" color="primary.main" width={96} />
          <Typography variant="h4" sx={{ my: 1 }}>
            既に回答されています
          </Typography>
          <Button onClick={handleFix} variant="contained">
            回答を修正
          </Button>
        </Stack>
      )}
    </>
  );
}

AttendanceSelect.propTypes = {
  date: PropTypes.string,
  part: PropTypes.string,
  grade: PropTypes.string,
  setAttendances: PropTypes.func,
  handlePrev: PropTypes.func,
  handleSend: PropTypes.func,
  error: PropTypes.bool,
};
