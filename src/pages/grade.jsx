import { Helmet } from 'react-helmet-async';

import { GradeView } from 'src/sections/grade/view';

// ----------------------------------------------------------------------

export default function GradePage() {
  return (
    <>
      <Helmet>
        <title> 学年 | Attendify </title>
      </Helmet>

      <GradeView />
    </>
  );
}
