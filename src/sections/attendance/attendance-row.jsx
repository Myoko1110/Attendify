import { useState } from 'react';
import PropTypes from 'prop-types';

import { Stack, Button, Typography } from '@mui/material';

import Attendances from 'src/utils/attendances';

import AttendanceDetail from './attendance-detail';

export default function AttendanceRow({
  date,
  attendances,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const { rate, actualRate } = attendances;
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
            <Stack direction="row" gap={1}>
              <Typography variant="subtitle2" width={70} textAlign="right">
                {rate.toFixed(2)}%
              </Typography>
              <Typography variant="body2" width={60}>
                ({actualRate.toFixed(2)}%)
              </Typography>
            </Stack>
          ) : (
            <Typography variant="body2">データなし</Typography>
          )}
        </Stack>
      </Button>
      <AttendanceDetail
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        attendances={attendances}
        setDeleteSuccessOpen={setDeleteSuccessOpen}
        setDeleteErrorOpen={setDeleteErrorOpen}
        setEditSuccessOpen={setEditSuccessOpen}
        setEditErrorOpen={setEditErrorOpen}
      />
    </>
  );
}

AttendanceRow.propTypes = {
  date: PropTypes.number,
  attendances: PropTypes.instanceOf(Attendances),
  setAttendances: PropTypes.func,
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
