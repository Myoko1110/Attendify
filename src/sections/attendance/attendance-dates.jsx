import PropTypes from 'prop-types';

import List from '@mui/material/List';

import Attendances from 'src/utils/attendances';

import AttendanceRow from './attendance-row';

export default function AttendanceDates({ attendances, updateAttendances }) {
  const attendanceDates = attendances.toDateList();

  return (
    <List>
      {Object.keys(attendanceDates).map((row, i) => (
        <AttendanceRow
          date={Number(row)}
          attendances={attendanceDates[row]}
          key={i}
          updateAttendances={updateAttendances}
        />
      ))}
    </List>
  );
}

AttendanceDates.propTypes = {
  attendances: PropTypes.instanceOf(Attendances),
  updateAttendances: PropTypes.func,
};
