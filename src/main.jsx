import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import {CookiesProvider} from "react-cookie";
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <CookiesProvider>
          <App />
        </CookiesProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
