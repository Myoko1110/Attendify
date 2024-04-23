import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, Button, Typography } from '@mui/material';

import Attendances from 'src/utils/attendances';

import AttendanceDetail from './attendance-detail';

export default function AttendanceRow({ date, attendances, updateAttendances }) {
  const { rate } = attendances;
  const [isOpen, setIsOpen] = useState(false);

  const day = attendances[0].date.getDay();

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        sx={{ my: 0.2 }}
        fullWidth
        // eslint-disable-next-line no-nested-ternary
        {...(day === 0
          ? {
              color: 'error',
            }
          : day === 6
          ? {
              color: 'info',
            }
          : {
              color: 'inherit',
            })}
      >
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ width: '100%' }}
        >
          <Typography variant="body1">{date}日</Typography>
          {rate !== null ? (
            <Typography variant="body2">{rate.toFixed(2)}%</Typography>
          ) : (
            <Typography variant="body2">データなし</Typography>
          )}
        </Stack>
      </Button>
      <AttendanceDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        attendances={attendances}
        updateAttendances={updateAttendances}
      />
    </>
  );
}

AttendanceRow.propTypes = {
  date: PropTypes.number,
  attendances: PropTypes.instanceOf(Attendances),
  updateAttendances: PropTypes.func,
};
