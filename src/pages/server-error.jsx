import { Helmet } from 'react-helmet-async';

import { ServerErrorView } from 'src/sections/server-error';

// ----------------------------------------------------------------------

export default function ServerErrorPage() {
  return (
    <>
      <Helmet>
        <title> 500 Internal Server Error </title>
      </Helmet>

      <ServerErrorView />
    </>
  );
}
