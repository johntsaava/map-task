import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import '~/index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' lazy={() => import('./routes/home')} />
      <Route path='*' lazy={() => import('./routes/404')} />
    </>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
