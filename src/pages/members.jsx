import { Helmet } from 'react-helmet-async';

import { MembersView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function MemberPage() {
  return (
    <>
      <Helmet>
        <title> 部員 | Attendify </title>
      </Helmet>

      <MembersView />
    </>
  );
}
