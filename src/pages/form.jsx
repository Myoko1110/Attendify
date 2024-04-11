import { Helmet } from 'react-helmet-async';

import { FormView } from 'src/sections/form/view';

// ----------------------------------------------------------------------

export default function FormPage() {
  return (
    <>
      <Helmet>
        <title> 出欠フォーム | Attendify </title>
      </Helmet>

      <FormView />
    </>
  );
}
