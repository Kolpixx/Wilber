import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import './index.css'
import Dashboard from './sites/Dashboard/Dashboard'

const router = createBrowserRouter([
  { path: "/", element: <Dashboard />}
]);

if (!localStorage.getItem(("entries"))) {
  localStorage.setItem("entries", "{}");
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
