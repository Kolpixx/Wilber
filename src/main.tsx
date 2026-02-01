import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { getSystemTheme } from './utils'
import Dashboard from './sites/Dashboard/Dashboard'
import EntryDetail from './sites/EntryDetail/EntryDetail'
import NotFound from './sites/NotFound/NotFound'

import './index.css'
import './themes.css'

const router = createBrowserRouter([
  { path: "/", element: <Dashboard />},
  { path: "/entry/:id", element: <EntryDetail />},
  { path: "*", element: <NotFound />}
]);

const defaultPreferences = {
  theme: "system"
}

if (!localStorage.getItem("entries")) {
  localStorage.setItem("entries", "[]");
}

if (!localStorage.getItem("preferences")) {
  localStorage.setItem("preferences", JSON.stringify(defaultPreferences))
}

const preferences = JSON.parse(localStorage.getItem("preferences") || JSON.stringify(defaultPreferences));
const preferredTheme = preferences.theme === "system" ? getSystemTheme() : preferences.theme || "light";
document.body.setAttribute("data-theme", preferredTheme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
