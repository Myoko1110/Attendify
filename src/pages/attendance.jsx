import { Helmet } from 'react-helmet-async';

import { AttendanceView } from 'src/sections/attendance/view';

// ----------------------------------------------------------------------

export default function AttendancePage() {
  return (
    <>
      <Helmet>
        <title> 出欠情報 | Attendify </title>
      </Helmet>

      <AttendanceView />
    </>
  );
}
