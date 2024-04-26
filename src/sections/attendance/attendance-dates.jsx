import PropTypes from 'prop-types';

import List from '@mui/material/List';

import Attendances from 'src/utils/attendances';

import AttendanceRow from './attendance-row';

export default function AttendanceDates({
  attendances,
  setDeleteSuccessOpen,
  setDeleteErrorOpen,
  setEditSuccessOpen,
  setEditErrorOpen,
}) {
  const attendanceDates = attendances.toDateList();

  return (
    <List>
      {Object.keys(attendanceDates).map((row, i) => (
        <AttendanceRow
          date={Number(row)}
          attendances={attendanceDates[row]}
          key={i}
          setDeleteSuccessOpen={setDeleteSuccessOpen}
          setDeleteErrorOpen={setDeleteErrorOpen}
          setEditSuccessOpen={setEditSuccessOpen}
          setEditErrorOpen={setEditErrorOpen}
        />
      ))}
    </List>
  );
}

AttendanceDates.propTypes = {
  attendances: PropTypes.instanceOf(Attendances),
  setDeleteSuccessOpen: PropTypes.func,
  setDeleteErrorOpen: PropTypes.func,
  setEditSuccessOpen: PropTypes.func,
  setEditErrorOpen: PropTypes.func,
};
