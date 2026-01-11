import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Dashboard from './sites/Dashboard/Dashboard'
import EntryDetail from './sites/EntryDetail/EntryDetail'

const router = createBrowserRouter([
  { path: "/", element: <Dashboard />},
  { path: "/entry/:id", element: <EntryDetail />}
]);

if (!localStorage.getItem(("entries"))) {
  localStorage.setItem("entries", "{}");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
