import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClassPage from './components/ClassPage'
import LandingPage from './components/LandingPage'

export const API_BASE_URL = 'http://localhost:4008/api';

const router = createBrowserRouter([{
  path: "/",
  element: <App />
}, {
  path: "/:className/:id",
  element: <ClassPage />
}, {
  path: "/login",
  element: <LandingPage />
}
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
