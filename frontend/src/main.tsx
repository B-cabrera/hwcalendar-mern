import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ClassPage from './components/ClassPage'
import LandingPage from './components/LandingPage'
import { Toaster } from 'react-hot-toast'

export const API_BASE_URL = 'https://hwcalendarapi.vercel.app/api';

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
    <Toaster />
  </React.StrictMode>,
)
