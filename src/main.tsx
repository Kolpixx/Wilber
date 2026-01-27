import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Dashboard from './sites/Dashboard/Dashboard'
import EntryDetail from './sites/EntryDetail/EntryDetail'

import './index.css'

const router = createBrowserRouter([
  { path: "/", element: <Dashboard />},
  { path: "/entry/:id", element: <EntryDetail />}
]);

const defaultPreferences = {
  theme: "light"
}

if (!localStorage.getItem("entries")) {
  localStorage.setItem("entries", "[]");
}

if (!localStorage.getItem("preferences")) {
  localStorage.setItem("preferences", JSON.stringify(defaultPreferences))
}

const preferences = JSON.parse(localStorage.getItem("preferences") || JSON.stringify(defaultPreferences));
document.body.setAttribute("data-theme", preferences.theme || "light");

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
