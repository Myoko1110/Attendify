import { Helmet } from 'react-helmet-async';

import { MembersView } from 'src/sections/user/view';

// ----------------------------------------------------------------------

export default function MembersPage() {
  return (
    <>
      <Helmet>
        <title> 部員 | Attendify </title>
      </Helmet>

      <MembersView />
    </>
  );
}
