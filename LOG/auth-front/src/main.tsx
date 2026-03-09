import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
//pagina de inicio
import App from './App.tsx'
//pagina de rutas
import Login from './routes/login.tsx'
import Signup from './routes/signup.tsx'
import Dashboard from './routes/Dashboard.tsx'

//las rutas 

import { createBrowserRouter, RouterProvider } from 'react-router-dom';






// vamod a crear las rutas
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
     element: <Signup/>,
    },
    {
      path: '/dashboard',
     element: <Dashboard />,
    }
])
  

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
