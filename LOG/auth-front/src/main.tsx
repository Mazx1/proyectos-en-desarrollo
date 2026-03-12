import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.tsx'


import Login from './routes/Login.tsx'
import Signup from './routes/signup.tsx'
import Dashboard from './routes/Dashboard.tsx'

// router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

// auth
import { AuthProvider } from './auth/AuthProvider.tsx'
import ProtectedRoute from './routes/ProtectedRoute.tsx'

// rutas
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/signup',
    element: <Signup />,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: 'dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
)