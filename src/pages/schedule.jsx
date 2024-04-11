import { Helmet } from 'react-helmet-async';

import { ScheduleView } from '../sections/schedule/view';

// ----------------------------------------------------------------------

export default function MemberPage() {
  return (
    <>
      <Helmet>
        <title> 予定 | Attendify </title>
      </Helmet>

      <ScheduleView />
    </>
  );
}
