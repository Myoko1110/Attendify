import { Helmet } from 'react-helmet-async';

import { PartView } from 'src/sections/part/view';

// ----------------------------------------------------------------------

export default function PartPage() {
  return (
    <>
      <Helmet>
        <title> パート | Attendify </title>
      </Helmet>

      <PartView />
    </>
  );
}
