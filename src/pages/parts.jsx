import { Helmet } from 'react-helmet-async';

import { PartView } from 'src/sections/parts/view';

// ----------------------------------------------------------------------

export default function MemberPage() {
  return (
    <>
      <Helmet>
        <title> パート | Attendify </title>
      </Helmet>

      <PartView />
    </>
  );
}
