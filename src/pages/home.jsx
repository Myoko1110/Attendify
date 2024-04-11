import { Helmet } from 'react-helmet-async';

import { HomeView } from 'src/sections/overview/view';

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title> ホーム | Attendify </title>
      </Helmet>

      <HomeView />
    </>
  );
}
